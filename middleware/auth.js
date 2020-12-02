const connection = require('../connection');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../config');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

// controller untuk registrasi
exports.registrasi = (req, res) => {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tanggal_daftar: new Date()
  }

  let query = "SELECT email FROM ?? WHERE ??=?";
  let table = ["user", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, (err, rows) => {
    if(err){
      console.log(err)
    }else{
      if(rows.length == 0){
        let query = "INSERT INTO ?? SET ?";
        let table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, (err, rows) => {
          if(err){
            console.log(err)
          }else{
            response.success("Berhasil menambahkan data user baru", res);
          }
        })
      }else{
        response.success("Email sudah terdaftar!", res)
      }
    }
  }) 
}