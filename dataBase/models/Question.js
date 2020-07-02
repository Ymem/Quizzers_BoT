module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        quiz_id: {
            type: DataTypes.STRING,
            foreignKey: true
        },
        question: {
            type: DataTypes.STRING
        },
        answer: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'questions',
        timestamps: false
    });

    const Quiz = sequelize.import('./Quiz.js');
    Question.belongsTo(Quiz, {foreignKey: 'quiz_id'});

    return Question
};
