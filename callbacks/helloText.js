const {bot} = require('../botConnector.js');

module.exports = async (msg) => {
    if (msg.new_chat_member && msg.new_chat_member.username === "Quizzers_BoT"){
        await bot.sendMessage(msg.chat.id,"👋Привіт! Я Quizzers_BoT - бот для проведення вікторин.\n" +
            "Створи нову вікторину в мене в особистих повідомленнях і запусти її тут комадою:\n\/quiz [код вікторини]");
    }
};
