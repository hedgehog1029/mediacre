var icecast = require('icecast');

exports.playStream = function(url, speaker) {
	icecast.get(url, function(res) {
		res.on('data', function(data) {
			return data;
		});
	});
}
