var http = require('http');
var Pool = require('pg').Pool;

// by default the pool will use the same environment variables
// as psql, pg_dump, pg_restore etc:
// https://www.postgresql.org/docs/9.5/static/libpq-envars.html
var config = {
    // host: '10.0.1.54',
    // user: 'itsmappl',
    // password: 'itsmappl',
    // database: 'itazdb',
    host: 'stampy.db.elephantsql.com',
    user: 'vsiozmuf',
    password: '6NZty2Ij84tucY8agp8-E3TDbl4n8jsN',
    database: 'vsiozmuf',
};

process.on('unhandledRejection', function (e) {
    console.log(e.message, e.stack)
});

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config);

var server = http.createServer(function (req, res) {

    var onError = function (err) {
        console.log(err.message, err.stack);
        res.writeHead(500, {'content-type': 'text/plain'});
        res.end('An error occurred');
    };
});

var loging = function startlog(fromId, resp) {
    pool.query("insert into log values (" + fromId + ", \'" + resp + "\')").then(function () {
        server.listen(3001, function () {
            console.log(resp + ' - saved id DB')
        })
    });
};

module.exports.loging = loging;
/////////////////////////////////////////////////////EXAMPLE/////////////////////////////////////////////////////
pool.query('CREATE TABLE IF NOT EXISTS log(user_id INTEGER, name CHAR(60))').then(function () {
    server.listen(3001, function () {
        console.log('DB server is listening on 3001')
    })
});