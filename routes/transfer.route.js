const express = require('express');
const controller = require('../controllers/transfer.controller.js');

const router = express.Router();

router.get('/',controller.transfer);

router.post('/',controller.postTransfer);


module.exports = router;