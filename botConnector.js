const TelegramBot = require('node-telegram-bot-api');
const {token} = require('./secret.js');

module.exports.bot = new TelegramBot(token, {polling: true});
