'use strict';

const response = require('./config');
const connection = require('./connection');

exports.index = (req, res) => {
  response.success('Success running');
}