/*
* The Mediocre Spotify interface.
*
* Makes use of the node-libspotify bindings. Also requires
* you to fill in your username and password in the spotify-password file.
*/

var sp = require('libspotify'),
    colors = require("colors");

var cred = require("../config/spotify-password");

var session = new sp.Session({
    applicationKey: './spotify_appkey.key'
});

var log = function(message) {
    console.log("spotify > ".red + message);
}

session.login(cred.login, cred.pass);
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

exports.getTrackFromUri = function(uri, callback) {
    var track = sp.Track.getFromUrl(uri);
    track.on("ready", function() {
        callback(track);
    });
}
