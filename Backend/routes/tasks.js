const express = require('express');
const { getTasks, completeTask } = require('../controllers/tasksController');
const { authGuard } = require('../middleware/authGuard');
const router = express.Router();

router.get('/', authGuard, getTasks);
router.post('/:id/complete', authGuard, completeTask);

module.exports = router;