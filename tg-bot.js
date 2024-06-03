const https = require('https');
const axios = require('axios');

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;

// Send message to Telegram bot

const sendMessage = async (message) => {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const payload = {
        chat_id: chatId,
        text: message,
        parse_mode: 'html' // html | markdown
    }
    
  return  axios.post(url, payload)
}

export { sendMessage };