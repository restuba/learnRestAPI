'use strict';

const response = require('./config');
const connection = require('./connection');

exports.index = (req, res) => {
  response.success('Success running', res);
}

// menampilkan data dari database
exports.getAllMahasiswa = (req, res) => {
  connection.query('SELECT * FROM mahasiswa', (err, rows, fields) => {
    if(err){
      connection.log(err);
    }else{
      response.success(rows, res);
    }
  })
}