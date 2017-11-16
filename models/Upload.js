var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Upload = bookshelf.Model.extend({
  tableName: 'uploads'
});

module.exports = Upload;
