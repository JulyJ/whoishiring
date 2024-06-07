import { Consumer, Kafka } from "kafkajs";
import { HnJobMessage } from "../models/hn-job-message";

type Offset = "beginning" | "latest" | string;

export class JobConsumer {
    private redpanda: Kafka;
    private consumer: Consumer;
    private offset: Offset = "latest";
    private topic = "";
    private onMessage: (message: HnJobMessage) => Promise<void>;

    constructor(
        kafkaBrokerUri: string,
        topic: string,
        onMessage: (message: HnJobMessage) => Promise<void>,
        offset?: Offset,
    ) {
        this.redpanda = new Kafka({
            clientId: "ai-hn-jobs-parser",
            brokers: [kafkaBrokerUri],
        });

        if (offset) {
            this.offset = offset;
        }

        this.topic = topic;
        this.onMessage = onMessage;
        this.consumer = this.redpanda.consumer({ groupId: "ai-parser" });
    }

    async connect() {
        try {
            console.log(`[JobConsumer] Connecting to the topic: ${this.topic} (offset: ${this.offset})...`);

            const fromBeginning = this.offset === "beginning";
            console.log(`[JobConsumer] fromBeginning: ${fromBeginning}`);
            await this.consumer.connect();
            await this.consumer.subscribe({
                fromBeginning,
                topic: this.topic,
            });

            this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const parsedMessage = JSON.parse((message.value as Buffer).toString());
                    if (!parsedMessage || !parsedMessage.operationType || parsedMessage.operationType !== "insert") {
                        return;
                    }
                    const fullDoc = parsedMessage.fullDocument;

                    await this.onMessage(fullDoc as HnJobMessage);
                },
            });

            if (this.offset !== "latest" && this.offset !== "beginning") {
                console.log(`[JobConsumer] Seeking to offset: ${this.offset}`);
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
