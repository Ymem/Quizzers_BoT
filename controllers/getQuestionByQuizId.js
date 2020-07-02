const db = require('../dataBase').getInstance();

module.exports = async (quiz_id) => {
    try {
        const QuestionModel = db.getModel('Question');
        const QuizModel = db.getModel('Quiz');

        if (!quiz_id) throw new Error('No quiz id!');

        const gotQuestion = await QuestionModel.findAll({
            attributes: [
                "id",
                "question",
                "answer"
            ],
            where: {
                quiz_id
            },
            include: {
                model: QuizModel,
                attributes: ["quiz_name"]
            }
        });
        // if (!gotQuiz) throw new Error('Quiz for this user do not exist!');
        // console.log("---");
        // console.log(gotQuestion);
        // console.log("---");

        return gotQuestion ? gotQuestion : null;
    } catch (err) {
        err.code = 400;
        throw err;
    }

};

