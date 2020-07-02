const db = require('../dataBase').getInstance();

module.exports = async (msg) => {
    try {
        const QuestionModel = db.getModel('Question');

        const quiz_id = msg.quiz_id;
        const question = msg.question;
        const answer = msg.answer;
        if (!quiz_id) throw new Error('No quiz id!');

        const insertedQuestion = await QuestionModel.create({
            quiz_id,
            question,
            answer
        });
        if (!insertedQuestion) throw new Error('Quiz is NOT created!');

        console.log(insertedQuestion);

        return insertedQuestion;
    } catch (err) {
        err.code = 400;
        throw err;
    }

};
