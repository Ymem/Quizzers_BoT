const {bot} = require('../botConnector.js');
const getQuizByOwnerId = require('../controllers/getQuizByOwnerId.js');

module.exports = async (msg) => {

    if (msg.chat.type === 'private') {

        let quizzes = await getQuizByOwnerId(msg.chat.id);

        if (!quizzes) {
            await bot.sendMessage(msg.chat.id, `У вас ще немає вікторин, створіть вікторину!`, {
                "reply_markup": {
                    "keyboard": [["Створити вікторину"], ["Меню"]],
                    "one_time_keyboard": true,
                    "resize_keyboard": true
                }
            });

        } else {
            let quizzes_names = [];
            quizzes.forEach(function (i) {
                quizzes_names.push([{
                    text: i.quiz_name,
                    callback_data: i.id + "_quiz"
                }]);
            });
            console.log(quizzes_names);

            const opts = {
                "reply_markup": {
                    "inline_keyboard": quizzes_names
                }
            };

            await bot.sendMessage(msg.chat.id, `Ваші вікторини:`, opts);
        }

    }

};
