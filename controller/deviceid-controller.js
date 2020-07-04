const { DeviceIdModel } = require('../model/deviceid-model');

module.exports.saveDeviceId = async (req, res, next) => {
    console.log('************');
    const deviceModel = new DeviceIdModel(req.body);
    try {
        var result = await deviceModel.save();
        return res.status(200).send({ 'message': 'device id saved successfully', data: result });
    } catch (err) {
        return res.status(500).send({ 'message': 'Failed to save device id', data: [] });
    }
}

module.exports.getDeviceId = async (req, res, next) => {
    try {
        const deviceIds = await DeviceIdModel.find({}).lean();
        if (deviceIds.length > 0) {
            return res.status(200).send({ 'message': 'Fetched all device ids', data: deviceIds });
        } else {
            return res.status(500).send({ 'message': 'Failed to fetch all device ids', data: [] })
        }
    } catch (err) {
        return res.status(500).send({ 'message': 'failed to fetch all device ids', data: false });
    }
}