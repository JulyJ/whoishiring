import { Kafka, Producer } from "kafkajs";
import { HnJobMessage } from "../models/hn-job-message";

export class ParsedJobProducer {
    private redpanda: Kafka;
    private producer: Producer;

    constructor(
        kafkaBrokerUri: string,
        private topic: string,
    ) {
        this.redpanda = new Kafka({
            clientId: "ai-hn-jobs-parser",
            brokers: [kafkaBrokerUri],
        });

        this.producer = this.redpanda.producer();
    }

    async connect() {
        try {
            await this.producer.connect();
        } catch (error) {
            console.error("[ParsedJobProducer] Failed to connect :", error);
        }
    }

    async sendMessage(original: HnJobMessage, parsed: any) {
        try {
            await this.producer.send({
                topic: this.topic,
                messages: [
                    {
                        value: JSON.stringify({
                            original,
                            parsed,
                        }),
                    },
                ],
            });
        } catch (error) {
            console.error("[ParsedJobProducer] Failed to send a message: ", error);
        }
    }

    async disconnect() {
        try {
            await this.producer.disconnect();
        } catch (error) {
            console.error("[ParsedJobProducer] Failed to disconnect: ", error);
        }
    }
}
