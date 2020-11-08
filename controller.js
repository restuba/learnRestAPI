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

// menambahkan data mahasiswa
exports.addMahasiswa = (req, res) => {
  const nim = req.body.nim;
  const nama = req.body.nama;
  const jurusan = req.body.jurusan;

  connection.query('INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?,?,?)', 
  [nim, nama, jurusan]), (err, rows, fields) => {
    if(err){
      console.log(err);
    }else{
      response.success('Berhasil menambahkan data!', res);
    }
  };
}

exports.editMahasiswa = (req, res) => {
  const nim = req.body.nim;
  const nama = req.body.nama;
  const jurusan = req.body.jurusan;

  connection.query('UPDATE mahasiswa SET nama=?, jurusan=? WHERE nim=?', 
  [nama, jurusan, nim]), (err, rows, fields) => {
    if(err){
      console.log(err);
    }else{
      response.success('Berhasil memperbarui data!', res);
    }
  }
}