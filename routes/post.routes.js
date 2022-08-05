const router = require('express').Router();
const mongoose = require('mongoose');

const { isAuthenticated } = require('../middleware/jwt.middleware');

const User = require('../models/User.model');
const Plan = require('../models/Plan.model');
const Post = require('../models/Post.model');


// Create > new post to specific plan
// TO ADD + Add new post _id to plan
// Expects param planId + created_by + post_text
router.post('/plans/:planId/post', (req, res, next) => {
    const { planId } = req.params;
    const { post_text, img_url, created_by } = req.body;
    
    Post.create({ post_text, img_url, plan: planId, created_by })
    .then(response => { 
        console.log(response._id);
        return res.json(response)})
    .catch(err => res.json(err));
});

// Read > all posts from specific plan
router.get('/plans/:planId/post', (req, res, next) => {
    Post.find()
        .then(allPlans => {
            res.json(allPlans)
        })
        .catch(err => res.json(err));
});

module.exports = router;