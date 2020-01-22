/*
    author Kubík Augustýn, kubik.augustyn@post.cz
*/
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2, osloveni, userData } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !osloveni || !userData ) {
    errors.push({ msg: 'Vyplňte všechna políčka' });
  }

  if (password != password2) {
    errors.push({ msg: 'Hesla se neshodují' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Heslo musí mít minimálně 6 znaků' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      osloveni,
      userData,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'E-mail už existuje' });
        res.render('register', {
          errors,
          name,
          osloveni,
          userData,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          osloveni,
          userData,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'Teď jste zaregistrován(a), můžete se přihlásit'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Byl(a) jste odhlášen(a)');
  res.redirect('/users/login');
});

module.exports = router;
