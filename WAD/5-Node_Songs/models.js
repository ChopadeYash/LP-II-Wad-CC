const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  Songname: {
    type: String,
    // required: true,
  },
  Film: {
    type: String,
    required: true,
  },
  Music_director: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  actor: {
    type: String,
    default: '',
  },
  actress: {
    type: String,
    default: '',
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
