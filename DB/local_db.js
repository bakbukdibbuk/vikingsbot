const lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./DB/DB.txt')
});
module.exports.getAnswer = getAnswer;

////////////////////////Read text to create Map of answers
var mapDb = new Map();

lineReader.on('line', function (line) {
    var arr;
    arr = line.split('\\');
    var wordTemp = new String(arr[0]);
    wordTemp = wordTemp.toLowerCase();
    if (mapDb.get(wordTemp)) {
        var temp = mapDb.get(wordTemp) + '::' + arr[1];
        mapDb.set(wordTemp.toLowerCase(), temp.toLowerCase());
    } else {
        var arr1 = new String(arr[0]);
        arr1 = arr1.toLowerCase();
        var arr2 = new String(arr[1]);
        arr2 = arr2.toLowerCase();
        mapDb.set(arr1, arr2);
    }
    //console.log(line);
});
setTimeout(function () {
    //console.log(mapDb.get('отлично'));
    console.log('Local db created!');
    // for (var key of myMap.keys()) {
    //     alert(key);
    // }
}, 10000);


var getAnswer = function startGetAnswer(question) {
    var resp = question.toLowerCase();
    var ans = mapDb.get(resp);
    if (ans) {
        var temp = ans.split('::');
        var tempLen = temp.length;
        var fAnswer = getRandomNum(0, tempLen - 1);
        console.log(fAnswer);
        return temp[fAnswer];
    } else {
        return ("Попробуй еще раз");
    }
};
module.exports.getAnswer = getAnswer;

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}