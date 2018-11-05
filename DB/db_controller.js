var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://telebot_roor:2156482@ds129428.mlab.com:29428/telebotdb";


// Connect to the db
MongoClient.connect(url, function(err, db) {
    if(!err) {
        console.log("Mongodb are connected");
    }else {
        console.log(err);
    }
});