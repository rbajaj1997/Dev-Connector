const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../../models/User');
const gravator = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route       POST api/users
// @desc        Register User
// @access      Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Pasword should be min 5 characters').isLength({ min: 5 })
], async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // Add Avatar
        const avatar = gravator.url(email, { s: '200', r: 'pg', d: 'mm' });

        // Create a new user
        user = new User({ name, email, password, avatar });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save User
        await user.save();

        // Create a payload
        const payload = {
            user: {
                id: user.id
            }
        };

        // generate a jwt token
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '2 days' }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({ token });
        });

    } catch (error) {
        res.status(500).send({ errors: { msg: 'Server Error' } })
    }
})

module.exports = router;