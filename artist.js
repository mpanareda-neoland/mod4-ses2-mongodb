const mongoose = require('mongoose');

const artistSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  featured: Boolean,
  rating: {
    type: Number,
    validate: {
      validator: function(val) {
        return val >= 0 && val <= 10;
      },
      message: 'Rating must be between 0 and 10'
    }
  },
  quote: String,
  main_tour: {
    country: String,
    year: Number
  },
  creation_date: Date,
  components: {
    number: Number,
    list: Array
  },
  tags: Array,
  country: String
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
