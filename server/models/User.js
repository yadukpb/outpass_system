const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: function() { return this.role === 'student'; } }, // Only required for students
  rollNo: { 
    type: String, 
    required: function() { return this.role === 'student'; }, 
    unique: function() { return this.role === 'student'; }, 
    sparse: true,
    default: undefined
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: function() { return this.role === 'hod'; } }, // Only required for HOD
  coordinator: { type: String, required: function() { return this.role === 'student'; } }, // Only required for students
  role: { type: String, required: true, enum: ['student', 'warden', 'coordinator', 'hod', 'root'] },
  batchCode: { type: String, required: function() { return this.role === 'coordinator'; } }, // Only required for coordinators
});

module.exports = mongoose.model('User', UserSchema);