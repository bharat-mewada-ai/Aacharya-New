const express = require('express');
const { scanWorkout } = require('../controllers/scannerController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.post('/', authGuard, scanWorkout);

module.exports = router;