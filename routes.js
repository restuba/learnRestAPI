'use strict';

module.exports = app => {
  const json = require('./controller');
  app.route('/').get(json.index);
  app.route('/tampil').get(json.getAllMahasiswa);
}