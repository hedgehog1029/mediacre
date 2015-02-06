/*
* The Mediocre media server
*/

//Requires & variables
var lame = require("lame"),
    colors = require("colors"),
    http = require("http"),
    fs = require("fs"),
    url = require("url");

var spotify = require('./lib/spotify.js');

//Log function
var log = function(message) {
    console.log("mediocre > ".red + message);
}

//Main code

var encoder = lame.Encoder({ channels: 2, bitDepth: 16, sampleRate: 44100 });
encoder.on("data", function(data) {
    sendData(data);
});

var decoder = lame.Decoder();
decoder.on("format", function(format) {
    decoder.pipe(encoder);
});

var clients = [];

function sendData(data) {
    clients.forEach(function(client) {
        client.write(data);
    });
}

var server = http.createServer(function(req, res){
    res.writeHead(200,{
        "Content-Type": "audio/mpeg"
    });
    // Add the response to the clients array to receive streaming
    clients.push(res);
    log("client connected.");
});
server.listen(1346);
log("media server listening on 0.0.0.0:1346");

var reqServer = http.createServer(function(req, res) {
    log("request connect");
    res.writeHead(200, { "Content-Type": "text/plain" });
    var searchQuery = JSON.parse(JSON.stringify(url.parse(req.url, true)));
    spotify.search(searchQuery["query"]["search"], 10, function(result) {
        res.end(result);
        log("search result: " + result);
    });
});
reqServer.listen(1347);
log("request server listening on 0.0.0.0:1347");

/*
spotify.test(function(track, player) {
    player.load(track);
    player.play();
    player.pipe(encoder);
    log("playing track");

    player.once("track-end", function() {
        log("track ended");
        player.stop();
    });
});

var readStream = fs.createReadStream("./music.mp3");

readStream.on("data", function(data) {
    var flushed = decoder.write(data);
    if (!flushed) {
        readStream.pause();
    }
});

decoder.on("drain", function() {
    readStream.resume();
});
*/
