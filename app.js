const {bot} = require('./botConnector.js');
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();



// приватні повідомлення бота

const startBot = require('./callbacks/startBot.js');
const sendMenu = require('./callbacks/sendMenu.js');
const callbackQueryListener = require('./callbacks/callbackQueryListener.js');
const myQuizzes = require('./callbacks/myQuizzes.js');
const newQuiz = require('./callbacks/newQuiz.js');

bot.onText(/\/start/, startBot);

bot.onText(/Створити вікторину/, newQuiz);

bot.onText(/Меню/, sendMenu);

bot.onText(/Мої вікторини/, myQuizzes);

bot.on('callback_query', callbackQueryListener);



// повідомлення бота у групових чатах

const helloText = require('./callbacks/helloText.js');
const startQuiz = require('./callbacks/startQuiz.js');
const startQuizHelp = require('./callbacks/startQuizHelp.js');

bot.on("message", helloText);

bot.onText(/\/quiz (.+)/, startQuiz);

bot.onText(/\/quiz/, startQuizHelp);



