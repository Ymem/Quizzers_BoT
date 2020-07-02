const {bot} = require('../botConnector.js');

const getQuestionById = require('../controllers/getQuestionById.js');
const deleteQuestion = require('../controllers/deleteQuestion.js');
const addQuestion = require('../callbacks/addQuestion.js');
const getQuestionByQuizId = require('../controllers/getQuestionByQuizId.js');
const sendMenu = require('../callbacks/sendMenu.js');

module.exports = async (callbackQuery) => {
    const {message: {chat, message_id}} = callbackQuery;
    let action = callbackQuery.data;
    action = action.split('_');

    console.log(callbackQuery);
    if (action[1] === "quiz") {

        let quest = await getQuestionByQuizId(action[0]);

        let questions = [];

        questions.push([{
            text: "➕Добавити запитання",
            callback_data: action[0] + "_AddQuestion"
        }]);

        quest.forEach(function (i) {
            questions.push([{
                text: i.question,
                callback_data: action[0] + "_question_" + i.id
            }]);
        });

        questions.push([{
            text: "⬅Назад у меню",
            callback_data: chat.id + "_BackToMenu"
        }]);

        const opts = {
            chat_id: chat.id,
            message_id,
            "reply_markup": {
                "inline_keyboard": questions
            }
        };


        if (!quest[0]) {
            await bot.editMessageText(`У даної вікторини немає запитань! \nДобавте запитання!`, {
                chat_id: chat.id,
                message_id,
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "➕Добавити запитання",
                                callback_data: action[0] + "_AddQuestion"
                            }
                        ],
                        [
                            {
                                text: "⬅Назад у меню",
                                callback_data: chat.id + "_BackToMenu"
                            }
                        ]
                    ]
                }
            });
        } else {
            await bot.editMessageText(`Вікторина: ` + quest[0].Quiz.quiz_name + `
                                          \nКод вікторини: ` + action[0], opts);
        }


    } else if (action[1] === "question") {
        let quest = await getQuestionById(action[2]);
        await bot.editMessageText(`Запитання: ` + quest.question + `
                                          \nвідповідь: ` + quest.answer,
            {
                chat_id: chat.id,
                message_id
                ,
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                text: "❌Видалити",
                                callback_data: action[0] + "_delete-question_" + action[2]
                            },
                            {
                                text: "⬅Назад",
                                callback_data: action[0] + "_quiz"
                            }
                        ]
                    ]
                }
            });

    } else if (action[1] === "BackToMenu") {
        await sendMenu(callbackQuery.message);

    } else if (action[1] === "AddQuestion") {
        const id = action[0];
        const owner_id = chat.id;
        await addQuestion({id, owner_id});

    } else if (action[1] === "delete-question") {
        let isDelete = await deleteQuestion(action[2]);

        const toQuestionBtn = {
            chat_id: chat.id,
            message_id,
            "reply_markup": {
                "inline_keyboard": [[{
                    text: "⬅Назад до вікторини",
                    callback_data: action[0] + "_quiz"
                }]]
            }
        };

        if (isDelete) {
            await bot.editMessageText(`Завдання успішно видалено.`, toQuestionBtn)
        } else {
            await bot.editMessageText(`Щось пішло не так, завдання не видалено.`, toQuestionBtn)
        }

    }
};
