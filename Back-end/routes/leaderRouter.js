const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const auth = require('../middleware/authentication');

router.get('/leaderboard', auth.authenticateToken, leaderboardController.getLeaderboard);

module.exports = router;
