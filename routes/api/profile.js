const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const request = require('request');
const config = require('config');
const {check, validationResult} = require('express-validator');

const Profile = require('../models/Profile');
const User = require('../models/User');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {
        // Get current user's profile + their name and avatar from the User model
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        // Return the profile
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   POST api/profile
// @desc    Create or update a user's profile
// @access  Private
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        // Split the skills input, a comma separated list, into an array with no spaces
        profileFields.skills = skills.toString().split(',').map(skill => skill.trim());
    }

    // Build social media object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({user: req.user.id});

        // If profile already exists, update it and return it
        if (profile) {
            profile = await Profile.findOneAndUpdate( {user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }

        // If no profile, create it and return it
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   GET api/profile
// @desc    Get all site profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Find all the profiles on the site, including their names and avatars
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try { 
        // Find the requested user's profile, including name and avatar
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({msg: "Profile not found"});
        res.json(profile);

    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') {
            return res.status(400).json({msg: "Profile not found"});
        }
        res.status(500).send('Server error');
    }
});


// @route   DELETE api/profile
// @desc    Delete profile, user, and posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo remove user's posts

        // Remove profile
        await Profile.findOneAndRemove({user: req.user.id});

        // Remove user
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: "User deleted"});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   PUT api/profile/experience
// @desc    Add experience to a profile
// @access  Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    // Create a new experience object with the data user submitted
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: req.user.id});

        // Add the new experience to user's profile
        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete an experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        // Get the array index of the particular experience to remove
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   PUT api/profile/education
// @desc    Add education to a profile
// @access  Private
router.put('/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    // Create a new education object with the data user submitted
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({user: req.user.id});

        // Add the new education to user's profile
        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   DELETE api/profile/education/:edu_id
// @desc    Delete an education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id});

        // Get the array index of the particular education to remove
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);
        await profile.save();

        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   GET api/profile/github/:username
// @desc    Get a user's repos from GitHub
// @access  Public
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };

        // Try to access the user's GitHub repos
        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({msg: 'GitHub profile not found'});
            }

            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



module.exports = router;