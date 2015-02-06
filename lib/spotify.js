var sp = require('libspotify'),
    colors = require("colors");

var session = new sp.Session({
    applicationKey: './spotify_appkey.key'
});

var log = function(message) {
    console.log("spotify > ".red + message);
}

session.login(cred.login, cred.password);
session.once("login", function() {
    log("connected to spotify");
});

exports.test = function(callback) {
    var search = new sp.Search("1983");
    search.trackCount = 1;
    search.execute();
    search.once("ready", function() {
        var track = search.tracks[0];
        var player = session.getPlayer();
        callback(track, player);
    });
}

exports.search = function(search, trackCount, callback) {
    var search = new sp.Search(search);
    search.trackCount = trackCount;
    search.execute();
    search.once("ready", function() {
        callback(search);
    });
}

exports.getPlayer = function() {
    return session.getPlayer();
}
