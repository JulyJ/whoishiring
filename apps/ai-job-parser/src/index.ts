import { JobConsumer } from "./consumers/job";
import { OpenAIBot } from "./services/openai-bot";
import { HnJobMessage } from "./models/hn-job-message";
import { MongoDBService } from "./services/mongodb.service";
import { ParsedJobProducer } from "./producers/parsed-job.producer";

require("dotenv").config();

async function start() {
    const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017";
    const mongodbService = new MongoDBService(mongodbUri);
    await mongodbService.connect(process.env.MONGODB_DB as string, process.env.MONGODB_COLLECTION as string);

    const openAiBot = new OpenAIBot(process.env.OPENAI_API_KEY as string);
    const parsedJobProducer = new ParsedJobProducer(
        process.env.KAFKA_BROKER_URI as string,
        process.env.PARSED_JOBS_TOPIC as string,
    );
    await parsedJobProducer.connect();

    const parseMessage = async (message: HnJobMessage) => {
        const parsed = await openAiBot.parseJobComment(message);
        parsed.created = message.time;
        parsed.threadId = message.threadId;
        parsed.author = message.author;
        parsed.docId = message._id;
        parsed.date = message.date;
        parsed.urls = message.urls;
        parsed.hasRemote = message.hasRemote;
        parsed.hasQA = message.hasQA;
        parsed.hasFrontend = message.hasFrontend;

        await parsedJobProducer.sendMessage(message, parsed);
        await mongodbService.insertJob({
            ...parsed,
            original: message,
        });
    };

    const jobConsumer = new JobConsumer(
        process.env.KAFKA_BROKER_URI as string,
        process.env.RAW_JOBS_TOPIC as string,
        parseMessage,
        process.env.JOBS_CONSUMER_OFFSET,
    );

    process.on("SIGINT", async () => {
        console.log("Closing app...");
        try {
            await jobConsumer.disconnect();
            await parsedJobProducer.disconnect();
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
