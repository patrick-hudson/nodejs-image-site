var async = require('async');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var qs = require('querystring');
var nodemailer = require('nodemailer');
var path = require('path');
var Upload = require('../models/Upload');
var transporter = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});

/**
 * GET /upload
 */
exports.uploadGet = function(req, res) {
  res.render('upload', {
    title: 'Upload File'
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