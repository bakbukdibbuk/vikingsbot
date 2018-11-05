const TelegramBot = require('node-telegram-bot-api');
const token = '183719913:AAE8ST-eVf0Afzu3JILGlzq8GuaVK6hGfHE';
const bot = new TelegramBot(token, { polling: true });
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./vikings_wiki/config.json', 'utf8'));

bot.on('message', function (msg, match) {
    var fromId = chatOrUserController(msg);
    checkBotEvent(msg, fromId);
});

function checkBotEvent(msg, fromId) {
    var isCommand = checkCommandEvent(msg, fromId);
    if (isCommand) return true;
    return false;
}

function checkCommandEvent(msg, fromId) {
    if (!msg.text || msg.text.charAt(0) != '/') {
        return false;
    }
    var enter = msg.text.toLowerCase();
    if (enter.charAt(0) == '/') {
        config.newItems.forEach(function (item) {
            if (item.name == enter) {
                var stream = fs.createReadStream(item.value);
                bot.sendPhoto(fromId, stream);
            }
        });
        console.log("Request: " + enter);
        if (enter == '/id') {
            bot.sendMessage(fromId, msg.from.id);
        } else if (enter == '/help' || enter == '/помощь' || enter == '/start') {
            bot.sendMessage(fromId, config.help);
        } else if (enter == '/helpall' || enter == '/all') {
            bot.sendMessage(fromId, config.all);
        } else {
            fs.appendFile('viking_wiki_bot.log', enter + "\n", function (err) {
                if (err) throw err;
            });
        }
        return true;
    }
    return false;
}



function chatOrUserController(msg) {
    if (msg.chat.id) {
        return msg.chat.id;
    } else if (msg.from.id) {
        return msg.from.id;
    }
}