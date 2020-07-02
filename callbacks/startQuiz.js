const {bot} = require('../botConnector.js');
const getQuestionByQuizId = require('../controllers/getQuestionByQuizId.js');

module.exports = async (msg, match) => {
    // match[1] - ID вікторини
    const quest = await getQuestionByQuizId(match[1]);

    await bot.sendMessage(msg.chat.id, '⚠Вікторина \"' + quest[0].Quiz.quiz_name + '\" почалась!⚠');

    let winners = [];
    let results = [];

    const quizzerSession = async (count) => {

        console.log('---------------------------');
        console.log(quest[count].question);
        console.log(quest[count].answer);
        console.log('---------------------------');


        await bot.sendMessage(msg.chat.id, "❔❗Увага, питання❓❕\n\n" + quest[count].question);

        let reg = new RegExp(quest[count].answer, "i");

        await bot.onText(reg, async (msg1) => {
            if (msg.chat.id === msg1.chat.id) {
                console.log(msg1);
                await bot.sendMessage(msg1.chat.id, "✅ Відповідь \"" + quest[count].answer + "\" правильна!",
                    {
                    reply_to_message_id: msg1.message_id
                });


                winners.push(msg1.from.username );

                count++;

                await bot.removeTextListener(reg);

                if (count < quest.length) {
                    await new Promise(r => setTimeout(r, 10000));
                    return await quizzerSession(count);
                } else {
                    winners.forEach(winner => {
                        if (results.length < 1){
                            results.push({
                                username : winner,
                                numOfAns : 1
                            });
                        } else {
                            for (let i = 0; i < results.length; i++){
                                if (results[i].username === winner) {
                                    results[i].numOfAns += 1;
                                } else if (i === results.length - 1){
                                    results.push({
                                        username : winner,
                                        numOfAns : 1
                                    });
                                }
                            }
                        }
                    });
                    let resultsStr = '';
                    for (let i = 0; i < results.length; i++){
                        resultsStr = (resultsStr + '@' + results[i].username + ' - ' + results[i].numOfAns + '\n');
                    }
                    await bot.sendMessage(msg1.chat.id, 'Кінець вікторини🔚\n\n🔸Результати🔸\n' +  resultsStr);
                }

            }
        });
    };

    await quizzerSession(0);

};
