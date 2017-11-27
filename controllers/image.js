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
exports.checkPermissions = function(req, res) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  else {
    Upload
      .where('file_id', req.body.image_id)
      .fetchAll()
      .then(function(file_info) {
        res.status(200).send(file_info);
      });
  }
};
exports.imageInfo = function(req, res) {
  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }
  else {
    Upload
      .where('file_id', req.body.image_id)
      .fetchAll()
      .then(function(file_info) {
        res.status(200).send(file_info);
      });
  }
};
