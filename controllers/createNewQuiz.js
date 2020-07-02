 const db = require('../dataBase').getInstance();

 module.exports = async (msg) => {
     try {
         const QuizModel = db.getModel('Quiz');

         const id = msg.id;
         const quiz_name = msg.quiz_name;
         const owner_id = msg.owner_id;
         if (!owner_id) throw new Error('No owner username!');

         const insertedQuiz = await QuizModel.create({
             id,
             quiz_name,
             owner_id
         });
         if (!insertedQuiz) throw new Error('Quiz is NOT created!');

         console.log(insertedQuiz);

         return insertedQuiz;
     } catch (err) {
         err.code = 400;
         throw err;
     }

 };
