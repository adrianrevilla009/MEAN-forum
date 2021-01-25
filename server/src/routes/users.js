const express = require('express');
const router = express.Router();
const User = require('../models/user');
const User_details = require('../models/user_details');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

router.post('/register', async (req, res, next) => {
    let newDetails = new User_details({
        country: req.body.details.country,
        city: req.body.details.city,
        adress: req.body.details.adress,
        telephone: req.body.details.telephone,
        image: req.body.details.image,
        short_description: req.body.details.short_description,
        about: req.body.details.about,
        check_newsletter: req.body.details.check_newsletter,
        check_posts: req.body.details.check_posts,
        check_offers: req.body.details.check_offers,
        last_conexion: req.body.details.last_conexion,
        register_date: req.body.details.register_date,
    });
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        details: newDetails
    });
    await User.addUser(newUser, async (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user!'})
        }else{
            await User_details.addUserDetails(newDetails, (err, user) => {
                if (err) {
                    res.json({success: false, msg: 'Failed to register user details!'})
                }
            });
            res.json({success: true, msg: 'User registered!'})
        }
    })
    
});
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, async (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1week
                });
                let user_details = {};
                await User_details.getUserDetailsById(user.details, (err, details) => {
                    if (err) throw err;
                    if (details) {
                        user_details = details;
                    }
                });
                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        details: user_details
                    }
                });
            }else{
                return res.json({success: false, msg: 'Wrong password'});
            }
        })
    })
});
// protected route with the token // put it as middleware -> passport.authenticate('jwt', {session: false})
router.get('/profile', (req, res, next) => {
    res.json({user: req.user})
});

router.post('/edit_profile', async (req, res, next) => {
    let user = {}
    // get user
    await User.getUserById(req.body.id, (err, usr) => {
        if (err) throw err;
        user = usr    
    });
    // update details data
    await User_details.updateUserDetailsById(user.details._id, req.body.details, (err, dt) => {
        if (err) throw err;
        if (dt) {
            // deberia de hacerse aqui, mejorar esta parte
            return;
        }
    });
    // get details updated
    await User_details.getUserDetailsById(user.details, (err, dt) => {
        if (err) throw err;
        if (dt) {
            user.details = dt;
        }
    });
    // COMPLETAR ESTO NO UPDATEA EL USER
    // update user data
    await User.updateUserById(user._id, user, (err, usr) => {
        if (err) throw err;
        user = usr;  
    });
    return res.json({success: true, msg: 'User details updated!', user: user})
});

module.exports = router;