const express = require('express');
const auth = require('./auth');
const router = express.Router();

// daftarkan menu registrasi
router.post('/api/register', auth.registrasi);

module.exports = router;