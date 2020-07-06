var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var { DeviceIdModel } = require('../model/deviceid-model');
const { model } = require('mongoose');


var deviceType = new GraphQLObjectType({
    name: 'device',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            deviceId: {
                type: GraphQLInt
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            devices: {
                type: new GraphQLList(deviceType),
                resolve: function () {
                    const devices = DeviceIdModel.find().exec();
                    if (!devices) {
                        throw new Error('Error');
                    }
                    return devices;
                }
            },
            device: {
                type: deviceType,
                resolve: function (root, params) {
                    const deviceDetails = DeviceIdModel.findById(params.id).exec();
                    if (!deviceDetails) {
                        throw new Error('Error');
                    }
                    return deviceDetails;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType });


var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addDevice: {
                type: deviceType,
                args: {
                    deviceId: {
                        type: GraphQLString
                    }
                },
                resolve: async function (root, params) {
                    const deviceModel = new DeviceIdModel(params);
                    const newDevice = await deviceModel.save();
                    if (!newDevice) {
                        throw new Error('Error');
                    }
                    return newDevice;
                }
            },
            removeDevice: {
                type: deviceType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const remDevice = DeviceIdModel.findByIdAndRemove(params.id).exec();
                    if (!remDevice) {
                        throw new Error('Error');
                    }
                    return remDevice;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });