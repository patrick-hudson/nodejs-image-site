/*!
* nodejs-image-site
*
*
*
* Node.js / Express.js / React.js
*
* LICENSE: MIT
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* author     Patrick Hudson <phudson2@gmail.com>
* copyright  2017 Patrick Hudson
* license    https://opensource.org/licenses/MIT MIT
* version    GIT: 1.0
*/

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
