/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */

//get doc ready for Jquery
$(document).ready(function() {

  console.log('app.js loaded!');

  //getting the albums api by feeding in albums
  //responds to app.get on back end
  $.get('/api/albums', function(albums){
    console.log(albums);
    //run through every alubum and pass in the album data
    albums.forEach(function(album) {
    renderAlbum(album);
    });
  });

  $('#album-form').submit(function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    console.log(formData);
    $(this).trigger("reset");
    $.post('/api/albums', formData, function(album){
      console.log(formData);
      renderAlbum(album);
    });
  });
});


//should take an array of songs and return and HTMl string
function buildSongsHtml(songs){
  //this adds a dash
  var songText = " &ndash; ";
  songs.forEach(function(song){
    songText = songText + " (" +song.trackNumber + ") " + song.name + " &ndash; ";
  });
  var songsHtml =    
    " <li class='list-group-item'>" +
    " <h4 class='inline-header'>Songs:</h4>" +
    " <span>" + songText + "</span>" +
    " </li>";
    return songsHtml;
}

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + "HARDCODED ALBUM ID" + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" +  album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +

  buildSongsHtml(album.songs) +

  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
  $('#albums').append(albumHtml);
}
