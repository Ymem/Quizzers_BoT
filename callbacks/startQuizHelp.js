const {bot} = require('../botConnector.js');

module.exports = async (msg) => {
    await bot.sendMessage(msg.chat.id, "👉Для запуску вікторини введіть /quiz і код вікторини, " +
        "яку бажаєте провести, в одному рядку через пробіл.")
};
