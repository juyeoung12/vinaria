// server/models/Lp.js
import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema({
  title: String,
  artist: String,
  time: String
});

const sideSchema = new mongoose.Schema({
  side: String,
  list: [trackSchema]
});

const lpSchema = new mongoose.Schema({
  id: String,
  title: String,
  artist: String,
  album: String,
  genre: String,
  edition: String,
  releaseDate: String,
  thumbnail: String,
  audioUrl: String,
  duration: String,
  playCount: Number,
  price: Number,
  shipping: Number,
  shippingInfo: String,
  rank_audio: Number,
  rank_sale: Number,
  tracks: [sideSchema],
  description_audio: String,
  description_sale: String,
  notice: String,
  trackInfo: String,
  showInChart: Boolean,
  showInList: Boolean,
  showAudioButton: Boolean,
  showPurchaseButton: Boolean
});

export default mongoose.model('Lp', lpSchema);
