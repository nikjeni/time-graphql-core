const express = require('express');

const router = express.Router();
const deviceIdController = require('../controller/deviceid-controller');

router.post('/saveDeviceId', deviceIdController.saveDeviceId);
router.get('/getDeviceids', deviceIdController.getDeviceId);

module.exports = router;