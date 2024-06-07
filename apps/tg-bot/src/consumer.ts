import { Consumer, Kafka } from "kafkajs";
import { HnJobMessage } from "./models/hn-job-message";

type Offset = "beginning" | "latest" | string;

export class TgBotConsumer {
    private redpanda: Kafka;
    private consumer: Consumer;
    private offset: Offset | undefined;
    private topic = "";
    private onMessage: (post: any, originalPost: HnJobMessage) => Promise<void>;

    private isPaused = false;
    private throttleLimit = 5;
    private requestCount = 0;
    private throttleInterval = 20 * 1000;

    constructor(
        kafkaBrokerUri: string,
        topic: string,
        onMessage: (post: any, originalPost: HnJobMessage) => Promise<void>,
        offset?: Offset,
    ) {
        this.redpanda = new Kafka({
            clientId: "tg-bot-hn-jobs",
            brokers: [kafkaBrokerUri],
        });

        if (offset) {
            this.offset = offset;
        }

        this.topic = topic;
        this.onMessage = onMessage;
        this.consumer = this.redpanda.consumer({ groupId: "tg-bot-v2" });
    }

    async connect() {
        try {
            console.log(`[TgBotConsumer] Connecting to the topic: ${this.topic} (offset: ${this.offset})...`);

            const fromBeginning = this.offset === "beginning";
            await this.consumer.connect();
            console.log("[TgBotConsumer] Connected to Kafka...");
            await this.consumer.subscribe({
                fromBeginning,
                topic: this.topic,
            });

            this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const parsedMessage = JSON.parse((message.value as Buffer).toString());
                    const parsedPost = parsedMessage.parsed;
                    const originalPost = parsedMessage.original;

                    if (this.isPaused) {
                        console.log("Consumer is paused, waiting to resume...");
                        return;
                    }

                    await this.onMessage(parsedPost, originalPost);

                    this.requestCount++;
                    if (this.requestCount >= this.throttleLimit) {
                        console.log(`Throttling for ${this.throttleInterval / 1000} seconds...`);
                        this.consumer.pause([{ topic: this.topic }]);
                        this.isPaused = true;

                        setTimeout(() => {
                            this.consumer.resume([{ topic: this.topic }]);
                            this.isPaused = false;
                            this.requestCount = 0;
                            console.log("Resuming consumer...");
                        }, this.throttleInterval);
                    }
                },
            });

            if (this.offset !== undefined && this.offset !== "latest" && this.offset !== "beginning") {
                console.log(`[TgBotConsumer] Seeking to offset: ${this.offset}`);
                this.consumer.seek({
                    topic: this.topic,
                    partition: 0,
                    offset: this.offset,
                });
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async disconnect() {
        try {
            await this.consumer.disconnect();
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
