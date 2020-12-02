const express = require('express');
const auth = require('./auth');
const router = express.Router();
let verification = require('./verification');


// daftarkan menu registrasi
router.post('/api/register', auth.registrasi);
router.post('/api/login', auth.login);

// alamat yang perlu autorisasi
router.get('/api/secret', verification(), auth.adminPage);

module.exports = router;