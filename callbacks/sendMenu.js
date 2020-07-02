const {bot} = require('../botConnector.js');

module.exports = async (msg) => {
    if (msg.chat.type === 'private'){
        await bot.sendMessage(msg.chat.id, `Quizzers_BoT - це ваш універсальний помічник для проведення вікторин. 
                                      \n\nТут ви можете створити Нову вікторину або переглядати та редагувати уже створені.`, {
            "reply_markup": {
                "keyboard": [["Створити вікторину"], ["Мої вікторини"]],
                "one_time_keyboard": true,
                "resize_keyboard": true
            }
        });
    }
};
