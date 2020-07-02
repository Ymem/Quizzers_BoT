const db = require('../dataBase').getInstance();

module.exports = async (id) => {
    try {
        const QuestionModel = db.getModel('Question');

        if (!id) throw new Error('No question id!');

        const gotQuestion = await QuestionModel.findOne({
            attributes: [
                "question",
                "answer"
            ],
            where: {
                id
            }
        });
        // if (!gotQuiz) throw new Error('Quiz for this user do not exist!');

        console.log(gotQuestion);

        return gotQuestion ? gotQuestion : null;
    } catch (err) {
        err.code = 400;
        throw err;
    }

};

