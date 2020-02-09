const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route       GET api/auth
// @desc        Test route
// @access      Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        res.status(401).json({ msg: 'Server Error' });
    }

})

// @route       POST api/auth
// @desc        Login user
// @access      Public
router.post('/', [
    check('email').isEmail(),
    check('password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {

        // Get the user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        // generate a token
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '2 days' }, function (err, token) {
            if (err) { throw err }
            res.json({ token })
        });

    } catch (error) {
        return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})
module.exports = router;