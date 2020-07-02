const {bot} = require('../botConnector.js');

const createNewQuestion = require('../controllers/createNewQuestion.js');

module.exports = async (msg) => {
    try {
        let question = false;
        let answer = false;
        const quiz_id = msg.id;
        const owner_id = msg.owner_id;
        await bot.sendMessage(owner_id, `Введіть запитання:`);
        await bot.on('message', async (msg1) => {
            if (!question && owner_id === msg1.chat.id) {
                question = msg1.text;
                await bot.sendMessage(msg1.chat.id, `Введіть відповідь:`);
                await bot.on('message', async (msg2) => {
                    if (!answer && owner_id === msg2.chat.id) {
                        answer = msg2.text;
                        await createNewQuestion({quiz_id, question, answer});
                        await bot.sendMessage(msg2.chat.id, `Запитання добавлено!`, {
                            "reply_markup": {
                                "inline_keyboard": [
                                    [{
                                        text: "➕Добавити запитання",
                                        callback_data: quiz_id + "_AddQuestion"
                                    }],
                                    [{
                                        text: "⬅До вікторини",
                                        callback_data: quiz_id + "_quiz"
                                    }]
                                ]
                            }
                        });
                    }
                })
            }
        })

    } catch (err) {
        err.code = 400;
        throw err;
    }
};
