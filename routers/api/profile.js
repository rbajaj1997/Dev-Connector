const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
const Posts = require('../../models/Posts');

// @route       GET api/profile/me
// @desc        Get current user's profile
// @access      Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
});

// @route       POST api/profile
// @desc        Create a profile for a user
// @access      Private
router.post('/', [auth, [
    check('status').not().isEmpty(),
    check('skills').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        youtube,
        twitter,
        linkedin,
        facebook,
        instagram } = req.body;

    // Build Profile Fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (website) profileFields.website = website;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    };
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile);
        }

        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: 'Server error. Could Not save profile' });
    }
})

// @route       GET api/profile
// @desc        All all user profiles
// @access      Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        // console.log(profiles);
        res.json(profiles);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: 'Server error. Could Not get profiles' });
    }
})

// @route       GET api/profile/user/:user_id
// @desc        Get single user's profile
// @access      Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ errors: 'User profile Not found' });
        }
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ errors: 'User profile Not found' });
        }
        return res.status(500).json({ msg: 'Server error. Could Not get profiles' });
    }
})

// @route       DELETE api/profile
// @desc        Delete profile, posts and user
// @access      Private
router.delete('/', auth, async (req, res) => {
    try {
        await Posts.deleteMany({ user: req.user.id });
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User Deleted' });
    } catch (error) {
        return res.status(500).json({ msg: 'Server error. Could Not delete profile' });
    }
})

// @route       PUT api/profile/experience
// @desc        Add a new experience
// @access      Private
router.put('/experience', [auth, [
    check('title', 'Title is a required field').not().isEmpty(),
    check('company', 'Company is a required field').not().isEmpty(),
    check('from', 'From is a required field').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, from, to, description, location, current } = req.body;
    const newExp = {
        title, company, from, to, description, location, current
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: 'Server Error!' });
    }
})

// @route       DELETE api/profile/experience/:id
// @desc        Delete an experience
// @access      Private
router.delete('/experience/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.experience.map(exp => exp.id).indexOf(req.params.id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: 'Server Error!' });
    }

})

// @route       PUT api/profile/education
// @desc        Add a new education
// @access      Private
router.put('/education', [auth, [
    check('school', 'School is a required field').not().isEmpty(),
    check('degree', 'Degree is a required field').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is a required field').not().isEmpty(),
    check('from', 'From is a required field').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, from, to, description, fieldofstudy } = req.body;
    const newEdu = {
        school, degree, from, to, description, fieldofstudy
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: 'Server Error!' });
    }
})

// @route       DELETE api/profile/education/:id
// @desc        Delete an education
// @access      Private
router.delete('/education/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.map(exp => exp.id).indexOf(req.params.id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: 'Server Error!' });
    }

});

// @route       GET api/profile/github/:username
// @desc        Get user repos from Github
// @access      Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientID')}&client_secret=${config.get('githubClientSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(options, (error, response, body) => {
            if (error) console.log(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No github profile found' });
            }
            res.json(JSON.parse(body));
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ errors: 'Server Error!' });
    }
})


module.exports = router;