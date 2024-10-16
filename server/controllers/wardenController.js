const Outpass = require('../models/Outpass');

exports.getPendingOutpasses = async (req, res) => {
  console.log('getPendingOutpasses: Started');
  try {
    const pendingOutpasses = await Outpass.find({ status: 'pending_warden' }).populate('student');
    console.log('getPendingOutpasses: Fetched outpasses', pendingOutpasses.length);
    res.json(pendingOutpasses);
  } catch (error) {
    console.error('getPendingOutpasses: Error', error);
    res.status(500).json({ message: 'Error fetching pending outpasses' });
  }
};

exports.getWardenDashboardData = (req, res) => {
  // Implementation
};

exports.approveOutpass = async (req, res) => {
  console.log('approveOutpass: Started', { params: req.params, body: req.body });
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const outpass = await Outpass.findByIdAndUpdate(id, {
      status: 'pending_coordinator',
      wardenApproval: { status: 'approved', comment, date: Date.now() }
    }, { new: true });
    console.log('approveOutpass: Updated outpass', outpass);
    res.json(outpass);
  } catch (error) {
    console.error('approveOutpass: Error', error);
    res.status(500).json({ message: 'Error approving outpass' });
  }
};

exports.rejectOutpass = async (req, res) => {
  console.log('rejectOutpass: Started', { params: req.params, body: req.body });
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const outpass = await Outpass.findByIdAndUpdate(id, {
      status: 'rejected',
      wardenApproval: { status: 'rejected', comment, date: Date.now() }
    }, { new: true });
    console.log('rejectOutpass: Updated outpass', outpass);
    res.json(outpass);
  } catch (error) {
    console.error('rejectOutpass: Error', error);
    res.status(500).json({ message: 'Error rejecting outpass' });
  }
};

exports.getStats = async (req, res) => {
  console.log('getStats: Started');
  try {
    const totalPending = await Outpass.countDocuments({ status: 'pending_warden' });
    const totalApproved = await Outpass.countDocuments({ 'wardenApproval.status': 'approved' });
    const totalRejected = await Outpass.countDocuments({ 'wardenApproval.status': 'rejected' });
    const lastDayRequests = await Outpass.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 24*60*60*1000) }
    });

    const stats = { totalPending, totalApproved, totalRejected, lastDayRequests };
    console.log('getStats: Final stats', stats);
    res.json(stats);
  } catch (error) {
    console.error('getStats: Error', error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
};
