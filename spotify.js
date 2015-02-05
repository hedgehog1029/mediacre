var cred = require('./passwd');
var sp = require('libspotify');

var session = new sp.Session({
    applicationKey: './spotify_appkey.key'
});

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
