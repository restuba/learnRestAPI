'use strict';

module.exports = app => {
  const json = require('./controller');
  app.route('/').get(json.index);
  app.route('/tampil').get(json.getAllMahasiswa);
  app.route('/tampil/:id').get(json.getById);
  app.route('/tambah').post(json.addMahasiswa);
  app.route('/edit').put(json.editMahasiswa);
  app.route('/hapus').delete(json.deleteMahasiswa);
  app.route('/datajson').get(json.displayJSON);
}