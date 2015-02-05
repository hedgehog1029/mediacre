/*
* The Mediocre media server
*/

var lame = require("lame"),
    colors = require("colors"),
    http = require("http"),
    stream = require('./stream.js');

var log = function(message) {
    console.log("mediocre > ".red + message);
}

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

stream.playStream('http://rainwave.cc/tune_in/5.mp3', function(data) {
    decoder.write(data);
});
