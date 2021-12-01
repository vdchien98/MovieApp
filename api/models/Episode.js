const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const EpisodeSchema = new mongoose.Schema(
    {
        movieId: { type: String, required: true },
        title: { type: Number, required: true, unique: true },
        video: { type: String },
        trailer: { type: String },
        banner: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model('episode', EpisodeSchema);
