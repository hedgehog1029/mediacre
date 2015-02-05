var icecast = require('icecast');

var exports = module.exports;

exports.playStream = function(url, speaker) {
	icecast.get(url, function(res) {
		res.on('data', function(data) {
			return data;
		});
	});
}
