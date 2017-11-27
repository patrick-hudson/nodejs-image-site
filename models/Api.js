var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Api = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = Api;
