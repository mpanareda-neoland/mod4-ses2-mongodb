const mongoose = require('mongoose');

const Artist = require('./artist');
const Album = require('./album');

mongoose.connect('mongodb://localhost/musica', function(err) {
  if (err) throw err;

  console.log('Successfuly connected!!');

  Artist.find({}).exec(function(err, artists) {
    if (err) throw err;

    console.log(artists);
  });

  Artist.findById('6030d5fceabdf62884a4349b', function(err, artist) {
    if (err) throw err;

    console.log(artist);
    artist.featured = true;
    artist.save(function(err) {
      if (err) throw err;

      console.log("Artist updated!");
    });

  });

  const ericClapton = new Artist({
		_id: new mongoose.Types.ObjectId(),
    name: "Eric Clapton",
    components: 1,
    country: "UK",
    featured: false,
    rating: 7.9,
    quote: "Always tears in heaven",
		main_tour: {
			country: 'Germany',
			year: 1999
		},
		creation_date: '1994-09-23',
		list_of_components: ['Eric Clapton'],
		tags: ['rock', 'blues', 'guitar', 'solo'],
	});

  ericClapton.save(function(err) {
    if (err) throw err;
  
    console.log('Nuevo artista guardado');
  });

  Artist.findByIdAndUpdate('6030d5fceabdf62884a4349b', { rating: 8.6 }, function(err, artist) {
    if (err) throw err;

    console.log(artist);
  });

  Album.find({}).exec(function(err, albums) {
    if (err) throw err;

    albums.forEach(album => {
      album.featured = false;
      album.save(function(err) {
        if (err) throw err;

        console.log('Album ' + album.title + ' unfeatured!');
      });
    });
    console.log(albums);
  });

});
