const NetworkEvent = require("../models/NetworkEvent.mongo");

const createNetworkEvent = async (eventData) => NetworkEvent.create(eventData);

const getNetworkEventById = async (eventId) =>
  NetworkEvent.findById(eventId).populate("generated_by", "username full_name");

const getAllNetworkEvents = async (filters = {}) =>
  NetworkEvent.find(filters)
    .populate("generated_by", "username full_name")
    .sort({ timestamp: -1 });

const updateNetworkEvent = async (eventId, updateData) =>
  NetworkEvent.findByIdAndUpdate(eventId, updateData, {
    new: true,
    runValidators: true,
  }).populate("generated_by", "username full_name");

const deleteNetworkEvent = async (eventId) => NetworkEvent.findByIdAndDelete(eventId);

module.exports = {
  createNetworkEvent,
  getNetworkEventById,
  getAllNetworkEvents,
  updateNetworkEvent,
  deleteNetworkEvent,
};
