import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";
import HnJobMessage from "./models/hn-job-message";
const redpanda = new Kafka({
    brokers: ["192.168.50.249:19092"],
});
const consumer = redpanda.consumer({ groupId: uuidv4() });

export async function connect() {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: "hn-jobs" });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const formattedValue = JSON.parse((message.value as Buffer).toString()) as HnJobMessage;
                console.log(`${formattedValue.title}: ${formattedValue.posting}`);
            },
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function disconnect() {
    try {
        await consumer.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}
