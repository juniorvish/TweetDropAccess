const express = require('express');
const router = express.Router();
const nftDropController = require('../controllers/nftDropController');

router.get('/nft-drop-info', nftDropController.getNftDropInfo);
router.post('/check-access', nftDropController.checkAccess);

module.exports = router;