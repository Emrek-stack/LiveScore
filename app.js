var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    request = require('request'),
    config = require('./global'),
    goals = require('./goals'),
    fs = require('fs');

app.use(express.static(path.join(__dirname, './www')));


//goals.createFile();


fs.watchFile(config.DataFileName, function (curr, prev) {
    var content = loadJSONFile(config.DataFileName);
    io.emit('goals', content);
    console.log('content emitted');
});


var io = require('socket.io').listen(http);

io.on('connection', function (socket) {
    console.log('User connected. Socket id %s', socket.id);

    var content = loadJSONFile(config.DataFileName);

    socket.emit('goals', content);
    console.log('content emitted');

    socket.on('disconnect', function () {
        console.log('User disconnected. %s. Socket id %s', socket.id);
    });
});


function loadJSONFile(filename) {
    try {
        var encoding = 'utf8';

        // read file synchroneously
        var contents = fs.readFileSync(filename, encoding);

        // parse contents as JSON
        return JSON.parse(contents);

    } catch (err) {
        // an error occurred
        throw err;
    }
}


http.listen(3000, function () {
    console.log('listening on: 3000');
});

