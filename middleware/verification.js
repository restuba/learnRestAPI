const jwt  = require('jsonwebtoken');
const config = require('../config/secret');

function verification(){
  return function(req, rest, next){
    const role = req.body.role;
    // cek authorizzation header
    let tokenWithBearer = req.headers.authorization;
    if(tokenWithBearer){
      let token = tokenWithBearer.split(' ')[1];
      // verifikasi
      jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
          return rest.status(401).send({
            auth: false,
            message: "Token tidak terdaftar!"
          })
        }else{
          if(role==2){
            req.auth = decoded;
            next();
          }else{
            return rest.status(401).send({
              auth: false,
              message: "Gagal mengautorisasi role anda!"
            })
          }
        }
      })
    }else{
      return rest.status(401).send({
        auth: false,
        message: "Token tidak tersedia!"
      })
    }
  }
}

module.exports = verification;

