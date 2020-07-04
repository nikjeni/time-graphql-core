const mongoose = require('mongoose');

const deviceIdsSchema = new mongoose.Schema({
    deviceId: String
})

module.exports.DeviceIdModel = mongoose.model('DeviceIdModel', deviceIdsSchema);