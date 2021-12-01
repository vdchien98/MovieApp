const router = require('express').Router();
const { request } = require('express');
const Movie = require('../models/Movie');
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

//CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newMovie = new Movie(req.body);
    try {
        const savedMovie = await newMovie.save();
        res.status(200).json(savedMovie);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newMovie = new Movie(req.body);
    try {
        const savedMovie = await newMovie.save();
        res.status(200).json(savedMovie);
    } catch (err) {
        res.status(500).json(err);
    }
});
//UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(500).json(err);
    }
});
// Delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json('Movie has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
});
// Get
router.get('/find/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET RANDOM

router.get('/random', async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === 'series') {
            movie = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }]);
        } else {
            movie = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
    } catch (err) {
        res.status(500).json(err);
    }
});
//Search
router.get('/search', async (req, res) => {
    try {
        // Movie.ensureIndex({ title: 'text', titleEng: 'text', country: 'text', genre: 'text', director: 'text', year: 'text', actor: 'text' });
        const movies = await Movie.find({ slug: { $regex: /hoi/i } });

        res.status(200).json(movies);
        console.log(movies);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
