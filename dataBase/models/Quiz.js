module.exports = (sequelize, DataTypes) =>
    sequelize.define('Quiz', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        quiz_name: {
            type: DataTypes.STRING
        },
        owner_id: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'quizzes',
        timestamps: false
    });

