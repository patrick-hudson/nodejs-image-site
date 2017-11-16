var async = require('async');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var nodemailer = require('nodemailer');
var path = require('path');
var User = require('../models/User');
require('es6-promise').polyfill();
require('isomorphic-fetch');
/**
 * GET /upload
 */
exports.getToken = function(req, res) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();
  console.log('test');
  if (errors) {
    return res.status(400).send(errors);
  }
console.log('test');
console.log('test');
const baseUrl = "http://18.216.197.146:3000";
    return fetch(baseUrl+'/login', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: req.body.email,
        password: req.body.password
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          var token = json.token;
          var user_id = json.user.id;

          new User({ email: req.body.email })
            .fetch()
            .then(function(user) {
              if (!user) {
                return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
                'Double-check your email address and try again.'
                });
              }
              user.comparePassword(req.body.password, function(err, isMatch) {
                console.log(user_id);
                if (!isMatch) {
                  return res.status(401).send({ msg: 'Failed to login' });
                } else {
                  return res.status(200).send({ user_id:  user_id, token: token });
                }

              });

            });
        });
      } else {
        return response.json().then((json) => {
          return res.status(401).send({ msg: 'Invalid email or password' });
        });
      }
    });

};
exports.setupApiKey = function(req, res) {
  //console.log(req.headers);
//  req.check(req.headers.authorization, '').isLength({ min: 1 });
//  req.assert('email', 'Email cannot be blank').notEmpty();
//  req.assert('password', 'Password cannot be blank').notEmpty();
//  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();
  console.log('test');
  if (errors) {
    return res.status(400).send(errors);
  }
//console.log('test');
//console.log('test');
var token = req.headers;
//console.log(token.authorization);
const baseUrl = "http://18.216.197.146:3000";
    return fetch(baseUrl+'/api/generateApiKey/generate', {
      method: 'post',
      headers: {
        'Authorization': `${token.authorization}`
      },
      body: JSON.stringify({
        email: 'test',
        password: 'test'
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          return res.status(200).send({ json });


            });
        //});
      } else {
        return response.json().then((json) => {
          return res.status(401).send({ msg: 'Invalid token' });
        });
      }
    });
};

exports.generateApiKey = function(req, res) {
  //console.log(req.headers);
  //req.assert(req.headers.authorization, 'Missing Authorization: Bearer').notEmpty();
//  req.assert('email', 'Email cannot be blank').notEmpty();
//  req.assert('password', 'Password cannot be blank').notEmpty();
//  req.sanitize('email').normalizeEmail({ remove_dots: false });

//console.log('test');
//console.log('test2');
var token = req.headers;
//console.log(token);
console.log();
User
    .query(function (qb) {
      qb.where({id: req.user.id})

  })
    .fetch({require: true})
    .then(function(collection) {
      collection.save('token', 'bob')
    })
  .then(function(user) {
        //res.send({ token: generateToken(user), user: user });
    })

return res.status(200).send({ user_id: req.user.id , token: token.authorization });

//          new User({ email: req.body.email })
//            .fetch()
//            .then(function(user) {
//              if (!user) {
//                return res.status(401).send({ msg: 'The email address ' + req.body.email + ' is not associated with any account. ' +
//                'Double-check your email address and try again.'
//                });
//              }
//              user.comparePassword(req.body.password, function(err, isMatch) {
//                console.log(user_id);
//                if (!isMatch) {
//                  return res.status(401).send({ msg: 'Invalid email or password' });
//                } else {
//                  return res.status(200).send({ user_id:  user_id, token: token });
//                }

//              });

};

/**
 * POST /contact
 */
exports.uploadFile = function(req, res) {
  //req.assert('name', 'Name cannot be blank').notEmpty();
  //req.assert('email', 'Email is not valid').isEmail();
  //req.assert('email', 'Email cannot be blank').notEmpty();
  //req.assert('message', 'Message cannot be blank').notEmpty();
  //req.sanitize('email').normalizeEmail({ remove_dots: false });
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  else {
    console.log(req.user.id);
    console.log(req.files[0]);
    console.log(path.parse(req.files[0].key).name)
    new Upload({
      file_id: path.parse(req.files[0].key).name,
      file_ext: path.parse(req.files[0].key).ext,
      user_id: req.user.id
    })
    .save()
    .then(function(saved) {
      //res.json({ saved });
    //return "complete"
    res.status(200).send({ 'file_id': path.parse(req.files[0].key).name, 'file_ext': path.parse(req.files[0].key).ext });
    });
  }
};
