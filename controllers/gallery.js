var async = require('async');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var nodemailer = require('nodemailer');
var path = require('path');
var Upload = require('../models/Upload');

/**
 * GET /upload
 */
 exports.getUserRecords = function(req, res) {
   console.log(req.user.id);
   return req
 };
exports.uploadGet = function(req, res) {
  var pageCount = req.params.page -1;
  var pageCount = pageCount *20;
  Upload
    .query(function (qb) {
        qb.limit(20).offset(pageCount).orderBy('id','DESC').where('user_id', req.user.id);
    })
    .fetchAll()
    .then(function(collection) {
      return Upload
      .query()
      .count()
      .then(function (count) {
          count = count[0]['count(*)'];
          var collectionJSON = collection.toJSON();
          //console.log(collectionJSON);
          collectionJSON.push({total_count: count});
          //console.log(collectionJSON);
          res.send(collectionJSON );
      });
    })
    .then(function(collection) {
        //res.send({ msg: 'test' });
    });

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
    console.log(req.files[0].filename);
    new Upload({
      file_id: path.parse(req.files[0].filename).name,
      file_ext: path.parse(req.files[0].filename).ext,
      user_id: req.user.id
    })
    .save()
    .then(function(saved) {
      //res.json({ saved });
      res.send({ msg: 'File uploaded' });
    });
  }
};
