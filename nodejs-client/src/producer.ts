import { Kafka } from "kafkajs";
const redpanda = new Kafka({
    brokers: ["192.168.50.249:19092"],
});
const producer = redpanda.producer();

export async function getConnection() {
    try {
        await producer.connect();
        return async (job: string) => {
            await producer.send({
                topic: "hn-jobs",
                messages: [{ value: JSON.stringify({ job }) }],
            });
        };
    } catch (error) {
        console.error("Error:", error);
    }
}

export async function disconnect() {
    try {
        await producer.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}
