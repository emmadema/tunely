var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//creates a schema to add more albums
let SongSchema = new Schema ({
	name: String,
	trackNumber: Number
});

var Song = mongoose.model('Song', SongSchema);

module.exports = Song;