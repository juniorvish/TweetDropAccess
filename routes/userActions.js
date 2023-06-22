const express = require('express');
const router = express.Router();
const userActionsController = require('../controllers/userActionsController');

router.post('/verify', async (req, res) => {
  try {
    const { userId, actions } = req.body;
    const result = await userActionsController.verifyUserActions(userId, actions);
    res.status(200).json({ success: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;