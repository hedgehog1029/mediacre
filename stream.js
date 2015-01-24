var icecast = require('icecast'),
lame = require('lame');

var decoder = lame.Decoder();
decoder.on('format', function(format) {
	decoder.pipe(stdout);
});

var playStream = function(url, speaker) {
	icecast.get(url, function(res) {
		res.on('data', function(data) {
			decoder.write(data);
		});
	});
}
