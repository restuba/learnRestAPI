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
      console.log(err);
    }else{
      response.success(rows, res);
    }
  })
}

// menampilkan data berdasar nim
exports.getById = (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM mahasiswa WHERE nim = ?', [id], (err, rows, fields) => {
    if(err){
      console.log(err);
    }else{
      response.success(rows, res);
    }
  })
}