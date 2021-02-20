const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  const dbo = db.db("musica");
  dbo.collection("artists").findOne({name: "AC/DC"}, function(err, result) {
    if (err) throw err;

    console.log("Artist name of AC/DC");
    console.log(result.name);
    console.log("---------");

  });


  dbo.collection("artists").find({}).toArray(function(err, result) {
    if (err) throw err;

    console.log("All artists name");
    const artists = result.map(artist => artist.name);
    console.log(artists);
    console.log("---------");
  });

  dbo.collection("albums").find({}).toArray(function(err, result) {
    if (err) throw err;

    // const tracks = [];
    // result.forEach(album => {
    //   album.tracks.forEach(track => {
    //     tracks.push(track.name);
    //   })
    // });
    // console.log(tracks);

    console.log("All tracks name");
    const tracks = result.map(album => album.tracks.map(track => track.name));
    console.log([].concat(...tracks));
    console.log("---------");

  });

  dbo.collection("albums").find({"tracks.genre": "Rock"}).toArray(function(err, result) {
    if (err) throw err;

    console.log("Rock tracks name");
    // const tracks = [];
    // result.forEach(album => {
    //   album.tracks.forEach(track => {
    //     if (track.genre == "Rock") {
    //       tracks.push(track.name);
    //     }
    //   })
    // });
    // console.log(tracks);

    const tracks = result.map(
      album => album.tracks.filter(
        track => track.genre == "Rock"
      ).map(
        track => track.name + ' (' + track.genre + ')'
      )
    );
    console.log([].concat(...tracks));
  });

});
