const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.get('/', authGuard, getUserProfile);
router.put('/', authGuard, updateUserProfile);

module.exports = router;