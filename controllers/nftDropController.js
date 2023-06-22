const express = require('express');
const router = express.Router();
const userActionsController = require('./userActionsController');
const nftDropSettings = require('../config').nftDropSettings;

router.get('/nft-drop-info', (req, res) => {
  res.json({
    nftDrop: nftDropSettings
  });
});

router.post('/check-access', async (req, res) => {
  const userId = req.body.userId;
  const userActions = await userActionsController.getUserActions(userId);

  const requiredActions = nftDropSettings.requiredActions;
  let accessGranted = true;

  for (const action of requiredActions) {
    if (!userActions[action.type] || userActions[action.type] < action.count) {
      accessGranted = false;
      break;
    }
  }

  res.json({
    accessGranted: accessGranted
  });
});

module.exports = router;