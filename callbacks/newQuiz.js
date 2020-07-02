const {bot} = require('../botConnector.js');
const createNewQuiz = require('../controllers/createNewQuiz.js');

module.exports = async (msg) => {
    if (msg.chat.type === 'private') {
        const id = Math.random().toString(36).substr(2, 10);
        let quiz_name = false;
        let owner_id = msg.chat.id;
        await bot.sendMessage(msg.chat.id, `Введіть назву вікторини`);
        await bot.on('message', async (msg) => {
            if (!quiz_name && owner_id === msg.chat.id) {
                quiz_name = msg.text;
                await createNewQuiz({id, quiz_name, owner_id});
                await bot.sendMessage(msg.chat.id, `Вікторина успішно створена!`, {
                    "reply_markup": {
                        "inline_keyboard": [
                            [{
                                text: "➕Добавити запитання",
                                callback_data: id + "_AddQuestion"
                            }]
                        ]
                    }
                });
            }
        })
    }
};
