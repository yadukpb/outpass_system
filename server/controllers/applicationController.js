const ApplicationRequest = require('../models/ApplicationRequest');
const User = require('../models/User');

// Get all application requests
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await ApplicationRequest.find().populate('studentId');
    res.json(applications);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching applications', error });
  }
};

// Create a new application request
exports.createApplication = async (req, res) => {
  const { destination, dateOfGoing, dateOfArrival, status } = req.body;

  try {
    const newApplication = new ApplicationRequest({
      studentId: req.user.id, // Assuming the user is authenticated and their ID is in req.user
      destination,
      dateOfGoing,
      dateOfArrival,
      status,
    });

    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: 'Error creating application', error });
  }
};

// Update an application request status
exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedApplication = await ApplicationRequest.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: 'Error updating application', error });
  }
};

// Delete an application request
exports.deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedApplication = await ApplicationRequest.findByIdAndDelete(id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting application', error });
  }
};