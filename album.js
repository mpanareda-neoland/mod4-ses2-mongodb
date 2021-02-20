const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
  name: String,
  genre: String,
  composer: String,
  milliseconds: Number,
  price: {
    base: Number,
    iva: Number,
    total: Number
  }
});
const albumSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  price: {
    base: Number,
    iva: Number,
    total: Number
  },
  release_date: Date,
  featured: Boolean,
  artist_id: mongoose.Schema.Types.ObjectId,
  tracks: [trackSchema]
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
