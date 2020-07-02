const {bot} = require('../botConnector.js');

module.exports = async (msg) => {
    if (msg.chat.type === 'private') {
        await bot.sendMessage(msg.chat.id, `Quizzers_BoT - це ваш універсальний помічник для проведення вікторин. 
                                      \n\nНатисніть кнопку "Створити вікторину" щоб створити нову вікторину.`, {
            "reply_markup": {
                "keyboard": [["Створити вікторину"], ["Меню"]],
                "one_time_keyboard": false,
                "resize_keyboard": true
            }
        });
    }
};
