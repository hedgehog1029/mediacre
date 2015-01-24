var stream = require('stream.js'),
speaker = require('speaker');

var speaker = new Speaker({
	channels: 2,
	bitDepth: 16,
	sampleRate: 44100
});

stream.playStream("http://rainwave.cc/tune_in/5.mp3", speaker);
