import OpenAI from "openai";
import { HnJobMessage } from "../models/hn-job-message";

export class OpenAIBot {
    private openai: OpenAI;
    private systemPrompt = `You're an AI assistant used to parse job posting from hacker news comment.
    Given the following comment message retrieve job information and relevant tags (remote, frontend/backend/qa/multiple positions and complete technology stack) in the following json format:

    {
        title: first line of the comment,
        description: "",
        company: "",
        location: location or remote or null if unknown,
        contact: "",
        notes: "",
        parsedUrls: [],
        tags: []
    }

    If you can't parse any of the fields replace them with null.
    Comment:
    `;

    constructor(apiKey: string) {
        this.openai = new OpenAI({
            apiKey,
        });
    }

    async parseJobComment(jobMessage: HnJobMessage): Promise<any> {
        const completion = await this.openai.chat.completions.create({
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: this.systemPrompt },
                { role: "user", content: jobMessage.text || "" },
            ],
            model: "gpt-3.5-turbo",
        });

        const parsed = JSON.parse(completion.choices[0]?.message.content || "");

        // Add date, parsedDate and author to the parsed object before save
        // Add original isRemote, isQA, isFrontend to the parsed object before save
        console.log("response:", parsed);

        return parsed;
    }
}
