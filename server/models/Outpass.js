const mongoose = require('mongoose');

const OutpassSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  outpassType: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  dateOfLeaving: {
    type: Date,
    required: true
  },
  timeOfLeaving: {
    type: String,
    required: true
  },
  dateOfReturn: {
    type: Date,
    required: true
  },
  timeOfReturn: {
    type: String,
    required: true
  },
  personalInfo: {
    name: String,
    batch: String,
    rollNo: String,
    address: String,
    phoneNo: String,
    parentPhoneNo: String
  },
  status: {
    type: String,
    enum: ['pending_warden', 'pending_coordinator', 'pending_hod', 'approved', 'rejected'],
    default: 'pending_warden'
  },
  wardenApproval: {
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    comment: String,
    date: Date
  },
  coordinatorApproval: {
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    comment: String,
    date: Date
  },
  hodApproval: {
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    comment: String,
    date: Date
  },
  qrCode: String
}, { timestamps: true });

module.exports = mongoose.model('Outpass', OutpassSchema);