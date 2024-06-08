import axios from "axios";

export async function sendMessage(
    botToken: string,
    chatId: string,
    text: string,
    parseMode: "html" | "markdown" = "html",
) {
    try {
        const payload = {
            chat_id: chatId,
            text,
            parse_mode: parseMode,
        };

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        return axios.post(url, payload);
    } catch (error) {
        console.error("[TgService] SendMessage failed:", error);
    }
}
