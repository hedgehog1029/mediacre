var icecast = require('icecast'),
lame = require('lame');

var decoder = lame.Decoder(speaker);
decoder.on('format', function(format) {
	decoder.pipe(speaker)
});

var playStream = function(url, speaker) {
	icecast.get(url, function(res) {
		res.on('data', function(data) {
			decoder(speaker).write(data);
		});
	});
}
