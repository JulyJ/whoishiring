import { JobConsumer } from "./consumers/job";
import { OpenAIBot } from "./services/openai-bot";
import { HnJobMessage } from "./models/hn-job-message";
import { MongoDBService } from "./services/mongodb.service";

require("dotenv").config();

console.log("main brokerURI:", process.env.KAFKA_BROKER_URI);

async function start() {
    const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    const mongodbService = new MongoDBService(mongodbUri);
    await mongodbService.connect(process.env.MONGODB_DB as string, process.env.MONGODB_COLLECTION as string);

    const openAiBot = new OpenAIBot(process.env.OPENAI_API_KEY as string);

    const parseMessage = async (message: HnJobMessage) => {
        const parsed = await openAiBot.parseJobComment(message);

        parsed.author = message.author;
        parsed.docId = message._id;
        parsed.date = message.date;
        parsed.urls = message.urls;
        parsed.hasRemote = message.hasRemote;
        parsed.hasQA = message.hasQA;
        parsed.hasFrontend = message.hasFrontend;

        await mongodbService.insertDocument(parsed);
    };

    let jobConsumerOffset = process.env.JOBS_CONSUMER_OFFSET || "latest";
    const jobConsumer = new JobConsumer(
        process.env.KAFKA_BROKER_URI as string,
        process.env.KAFKA_TOPIC as string,
        parseMessage,
        jobConsumerOffset,
    );

    process.on("SIGINT", async () => {
        console.log("Closing app...");
        try {
            await jobConsumer.disconnect();
        } catch (err) {
            console.error("Error during cleanup:", err);
            process.exit(1);
        } finally {
            console.log("Cleanup finished. Exiting");
            process.exit(0);
        }
    });

    await jobConsumer.connect();
}

start();
