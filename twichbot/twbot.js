var tmi = require('tmi.js');
var fs = require('fs');
var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./logs/logs.txt')
});
var options = {
    options: {
        debug: true
    },
    connection: {
        cluster: "aws",
        reconnect: true
    },
    identity: {
        username: "vbrendon00",
        password: 'oauth:8kt80wvt4zmr7mtviswzny1i1gknit'
    },
    channels: ["LenaGol0vach"]
};
var client = new tmi.client(options);
client.connect();

/////////////////////////////////////////////////////LOG to FILE///////////////////////////////////////////////
client.on("connected", function (address, port) {
    console.log('###TWICH BOT WAS CONNECTED ###');
});

client.on("chat", function (channel, user, message, self) {
    fs.appendFile('./logs/logs - Copy.txt', user.username + " - " + message + "\n", function (err) {
        if (err) throw err;
      //  console.log('Saved to log - ' + message);
    });
});

////////////////////////READ LOG
var mapDb = new Map();
lineReader.on('line', function (line) {
    var arr;
    arr = line.split(' ');
    arr.forEach(function(item, i, arr) {
        item = item.toLowerCase();
    if(item.length > 3){
    if(mapDb.has(item)){
        var temp = mapDb.get(item);
        mapDb.delete(item);
        mapDb.set(item.toLowerCase(),temp+1);
        //console.log(item+'   '+mapDb.get(item));
    }else {
        mapDb.set(item.toLowerCase(),0);
        //console.log(item+'   '+mapDb.get(item));
    }
    //console.log(line);
    }

    });
});
var sortable = [];
for (var vehicle in mapDb) {
    sortable.push([vehicle, mapDb[vehicle]]);
}

sortable.sort(function(a, b) {
    return a[1] - b[1];
});
for (var k in mapDb) {
//    console.log(k, mapDb[k])
}
