/**
 * Created by paulo on 4/13/2018.
 */
const VK = require('vk-node-sdk');
const vk_credentials = require('./vk_credentials');
var request = require("request");
const Group = new VK.Group(vk_credentials.group_token);
const User = new VK.User(vk_credentials.user_token);
//const icons = ['🌡','⛅','💨','🌞','🌚','☁','🌧','❄'];
const icons = [
    {
        name: 'mist',
        nameR: 'ветер',
        value: '💨'
    },
    {
        name: 'snow',
        nameR: 'снег',
        value: '❄'
    },
    {
        name: 'thunderstorm',
        nameR: 'ураган',
        value: '🌪'
    },
    {
        name: 'rain',
        nameR: 'дождь',
        value: '🌧'
    },
    {
        name: 'drizzle',
        nameR: 'мелкий дождь',
        value: '🌧'
    },
    {
        name: 'clouds',
        nameR: 'облачно',
        value: '⛅'
    },
    {
        name: 'clear',
        nameR: 'чистое небо',
        value: '🌚',
        valueDay: '🌝'
    },
    {
        name: 'extreme',
        nameR: 'экстримальная погода',
        value: '⚠🆘'
    }
];
const temp_icon = '🌡';
//mist, snow, thunderstorm, rain, shower rain, broken clouds, scattered, clouds, few clouds, clear sky,

console.log("start");

Group.onMessage((message) => {

    
    message.setTyping();
    //message.addText(local_db.getAnswer(message.body)).send();  // ВКЛЮЧИТЬ БОТА РАЗГОВОРНОГО
    var bodyText = message.body;
    var personalId = message.peer_id;

    var city = encodeURIComponent(bodyText);
    console.log("Запрашиваемый город - " + bodyText.toString());
    let url = 'http://api.geonames.org/searchJSON?name=' + city + '&username=paulo';
    getGeoName();
    function getGeoName() {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                if (body.geonames && body.geonames.length > 0) {
                    return getWeatherToday(body.geonames[0].geonameId.toString());
                } else return send_error();
            } else return send_error();
        })
    }

    function getWeatherToday(city2) {
        var myCity = city2;
        let url = 'http://api.openweathermap.org/data/2.5/weather?id=' + myCity + '&appid=0a8339daf8401d860f640c1202023a74&units=metric';
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let humidity = 'влажность ' + body.main.humidity + '%'; //влажность
                debugger;
                let pressure = 'давление ' + body.main.pressure + ' mm Hg'; //давление
                let temper = 'сейчас ' + temp_icon + ' ' + substringerDot(body.main.temp) + '°'; //температура сейчас
                let wind_ = 'скорость ветра ' + body.wind.speed + ' м/с';
                let iconReturn = 'В городе ' + bodyText.toString();
                // let temp_max = 'максимум ' + temp_icon + ' ' + body.main.temp_max + '°'; //температура максимальная
                // let temp_min = 'минимум ' + temp_icon + ' ' + body.main.temp_min + '°'; //температура минимальная
                for (let icon in icons) {
                    if (icons[icon].name == body.main.temp && body.main.temp != 'clear') {
                        iconReturn += icons[icon].value.toString();
                        iconReturn += ' ' + icons[icon].nameR.toString();
                        break;
                    }
                    if (icons[icon].name == body.main.temp && body.main.temp == 'clear') {
                        if (body.weather[0].icon == '01n') {
                            iconReturn += icons[icon].value.toString();
                            break;
                        } else iconReturn += icons[icon].valueDay.toString();
                        iconReturn += ' ' + icons[icon].nameR.toString();
                        break;
                    }
                }
                iconReturn += ' ' + temper + '\n';//temp_max+' '+temp_min+'\n';
                iconReturn += ' ' + humidity + ', ' + pressure + '\n' + wind_ + '\n';
                message.addText(iconReturn).send();
                //message.addPhoto('https://openweathermap.org/img/w/' + body.weather[0].icon + '.png').send();
            } else {
                return send_error();
            }
        });
    }

    function substringerDot(value) {
        let tempVal = value.toString();
        tempVal = tempVal.split(".")[0];
        return tempVal;
    }

    function send_error() {
        message.addText('Я не знаю такого города, попробуйте написать город по английски').send();
        //example post to wall in group
        // User.api('wall.post', {
        //     owner_id: '-161226505',
        //     message: 'test'
        // })
    }
});
//❄⛅💨🌞🌚☁🌧🌡
Group.onCommand('/help', (message) => {
    message.addText('Это тестовый бот для проверки библиотеки vk-node-sdk.').send()
});
