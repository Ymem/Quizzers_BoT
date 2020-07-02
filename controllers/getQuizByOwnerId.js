const db = require('../dataBase').getInstance();

module.exports = async (owner_id) => {
    try {
        const QuizModel = db.getModel('Quiz');

        if (!owner_id) throw new Error('No owner id!');

        const gotQuiz = await QuizModel.findAll({
            attributes: [
                "id",
                "quiz_name"
            ],
            where: {
                owner_id
            }
        });
        // if (!gotQuiz) throw new Error('Quiz for this user do not exist!');

        console.log(gotQuiz);

        return gotQuiz ? gotQuiz : null;
    } catch (err) {
        err.code = 400;
        throw err;
    }

};
