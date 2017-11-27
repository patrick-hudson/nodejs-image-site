/**
 * Patrick Hudson
 *
 */
var async = require('async');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var nodemailer = require('nodemailer');
var path = require('path');
var User = require('../models/User');
var Api = require('../models/Api');
var Upload = require('../models/Upload');
var uuidv4 = require('uuid/v4');
require('es6-promise').polyfill();
require('isomorphic-fetch');
var path = require('path');
var multer = require('multer');
var formidable = require('formidable');
var settings = require('../config/settings.js');
var multerS3 = require('multer-s3'),
fs = require('fs'),
AWS = require('aws-sdk');
AWS.config.loadFromPath(path.join(__dirname, '../app/s3_config.json'));
var s3 = new AWS.S3();
var storage =  multerS3({
    s3: s3,
    bucket: 'ul.gy',
    contentType: function (req, file, cb) {
      cb(null, file.mimetype)
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(10, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      });
    },
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      crypto.pseudoRandomBytes(10, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      })
    }
});

var upload = multer({ storage : storage }).any();
/**
 * GET /upload
 */
exports.getToken = function(req, res) {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.assert('password', 'Password cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }
const baseUrl = settings.base_url;
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
  var errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }
var token = req.headers;
const baseUrl = settings.base_url;
    return fetch(baseUrl+'api/generateApiKey/generate', {
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
      } else {
        return response.json().then((json) => {
          return res.status(401).send({ msg: 'Invalid token' });
        });
      }
    });
};

exports.generateApiKey = function(req, res) {
var token = req.headers;
var aKey = uuidv4().replace(/-/g, '');

Api
    .query(function (qb) {
      qb.where({id: req.user.id})

  })
    .fetch({require: true})
    .then(function(collection) {
      collection.save('token', aKey)
    })
return res.status(200).send({ user_id: req.user.id , apiKey: aKey });

};

exports.getApiKey = function(req, res) {
  var payload = req.isAuthenticated();
  console.log(payload)
User
    .query(function (qb) {
      qb.where({id: payload.sub})

  })
    .fetch({columns: ['token']})
    .then(function(collection) {
return res.status(200).send({ apiKey: collection.toJSON().token });
      //return { user_id: payload.sub , apiKey: collection };

})

};
exports.checkApiKey = function(req, res, next) {
  console.log(req.headers.apikey);
  console.log(req.headers.userid);
  User
      .query(function (qb) {
        qb.where({id: req.headers.userid})

    })
      .fetch({columns: ['token']})
      .then(function(collection) {
        if(req.headers.apikey != collection.toJSON().token){
          return res.status(401).send({ message: 'API Key Invalid' });
        }
        else{
          console.log('API Matches');
          next();
        }
        //console.log(collection.toJSON().token);
      })
  //return res.status(200).send({ apiKey: collection.toJSON().token });
  //next();

};
/**
 * POST /contact
 */
exports.uploadFile = function(req, res) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  else {
    new Upload({
      file_id: path.parse(req.files[0].key).name,
      file_ext: path.parse(req.files[0].key).ext,
      user_id: req.headers.userid
    })
    .save()
    .then(function(saved) {
    res.status(200).send({ 'file_id': path.parse(req.files[0].key).name, 'file_ext': path.parse(req.files[0].key).ext, 'full_url': settings.short_url+path.parse(req.files[0].key).name+path.parse(req.files[0].key).ext});
    });
  }
};
