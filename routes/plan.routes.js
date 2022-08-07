const router = require('express').Router();
const mongoose = require('mongoose');

const { isAuthenticated } = require('../middleware/jwt.middleware');

const User = require('../models/User.model');
const Plan = require('../models/Plan.model');
const Post = require('../models/Post.model');

// Create > new plan
router.post('/plans',  isAuthenticated, (req, res, next) => {
    const { title, description, img_url, location, created_by, invite_link, joined, posts } = req.body;

    Plan.create({ title, description, img_url, location, created_by, invite_link, joined, posts })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});

//  Read > all plans
router.get('/plans', isAuthenticated, (req, res, next) => {
    Plan.find()
        .then(allPlans => {
            res.json(allPlans)
        })
        .catch(err => {
            res.json(err);
            
        });
});


// Read > specific plan
router.get('/plans/:planId', isAuthenticated, (req, res, next) => {
    const { planId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(planId)) {
        res.status(400).json({ message: 'Specified id for plan is not valid' });
        return;
    }

    Plan.findById(planId)
        .populate('posts', 'joined')
        .then(response => res.json(response))
        .catch(err => res.json(err));
})




module.exports = router;