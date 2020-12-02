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

//controller untuk login
exports.login = (req, res) => {
  let post = {
    password: req.body.password,
    email: req.body.email
  }

  let query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  let table = ["user", "password", md5(post.password), "email", post.email];

  query = mysql.format(query,table);
  connection.query(query, (err, rows) => {
    if(err){
      console.log(err)
    }else{
      if(rows.length == 1){
        let token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440
        });

        id_user = rows[0].id;

        let data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address()
        }
        
        let query = "INSERT INTO ?? SET ?";
        let table = ["akses_token"];

        query = mysql.format(query, table);
        connection.query(query, data, (err, rows) => {
          if(err){
            console.log(err)
          }else{
             res.json({
               success: true,
               message: 'Token JWT tergenerate!',
               token: token,
               currUser: data.id_user
             });
          }
        });
      }else{
         res.json({
           "Error": true,
           "Message": "email atau passwordnya salah"
          });
      }
    }
  } )
}

exports.adminPage = (req,res) => {
  response.success("Halaman ini hanya untuk admin dengan role = 2", res)
}