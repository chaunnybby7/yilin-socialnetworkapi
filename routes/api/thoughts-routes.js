const router = require('express').Router();

const { application } = require('express');
const { getAllThoughts, getThoughtById, addThought, updateThought, removeThought, addReaction, removeReaction } = require('../../controllers/thoughts-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

