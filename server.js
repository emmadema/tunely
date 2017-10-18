// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));


app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/

var db = require('./models');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

//GET api
app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

//GET api/albums
app.get('/api/albums', function albumsIndex(req, res) {
  db.Album.find({}, function(err, albums) {
    res.json(albums);
  });
});

//POST api/albums
app.post('/api/albums', function new_album(req, res){
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;
  //creates a new array from the restults
  db.Album.create(req.body, function(err, album) {
  console.log(album);
  res.json(album);
  });
});

//GET api/albums/:id
app.get('/api/albums/:id', function albumShow(req, res) {
  console.log('requested album id=', req.params.id);
  db.Album.findOne({_id: req.params.id}, function(err, album) {
    res.json(album);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
