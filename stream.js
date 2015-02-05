var icecast = require('icecast');

exports.playStream = function(url, callback) {
	icecast.get(url, function(res) {
		res.on('data', function(data) {
			callback(data);
		});
	});
}
