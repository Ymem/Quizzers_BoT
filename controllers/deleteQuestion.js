const db = require('../dataBase').getInstance();

module.exports = async (id) => {
    try {
        const QuestionModel = db.getModel('Question');

        if (!id) throw new Error('No question id!');

        const deletedQuestion = await QuestionModel.destroy({
            where: {
                id
            }
        });
        if (!deletedQuestion) throw new Error('Question is NOT deleted!');

        console.log(deletedQuestion);

        return deletedQuestion ? deletedQuestion : null;
    } catch (err) {
        err.code = 400;
        throw err;
    }

};
