import axios from 'axios';

const botToken: string | undefined = process.env.TG_BOT_TOKEN;
const chatId: string | undefined = process.env.TG_CHAT_ID;

// Send message to Telegram bot
const sendMessage = async (message: string): Promise<any> => {
    if (!botToken || !chatId) {
        throw new Error('TG_BOT_TOKEN or TG_CHAT_ID is missing from environment variables');
    }

    const url: string = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
        chat_id: chatId,
        text: message,
        parse_mode: 'html' // html | markdown
    };
    
    return axios.post(url, payload);
};

export { sendMessage };
