var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Song = require('./song.js');

//creates a schema to add more albums
let AlbumSchema = new Schema ({
	artistName: String,
	name: String,
	releaseDate: String,
	genres: [String],
	songs: [Song.schema] 
});

//songs.push(Song.Schema);

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;