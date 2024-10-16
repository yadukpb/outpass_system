const Outpass = require('../models/Outpass');
const crypto = require('crypto');

exports.scanQRCode = async (req, res) => {
  try {
    const { qrData } = req.body;
    const [outpassId, timestamp, hash] = qrData.split('|');
    
    const secret = process.env.QR_SECRET || 'your-secret-key';
    const computedHash = crypto.createHmac('sha256', secret).update(`${outpassId}|${timestamp}`).digest('hex');
    
    if (computedHash !== hash) {
      return res.status(400).json({ message: 'Invalid QR code' });
    }
    
    const outpass = await Outpass.findById(outpassId);
    if (!outpass) {
      return res.status(404).json({ message: 'Outpass not found' });
    }
    
    if (outpass.securityCheckout.status === 'pending') {
      outpass.securityCheckout = { status: 'checked_out', date: Date.now() };
    } else if (outpass.securityCheckin.status === 'pending') {
      outpass.securityCheckin = { status: 'checked_in', date: Date.now() };
    } else {
      return res.status(400).json({ message: 'Outpass already checked in and out' });
    }
    
    await outpass.save();
    
    res.json({ message: 'QR code scanned successfully', outpass });
  } catch (error) {
    res.status(500).json({ message: 'Error scanning QR code', error });
  }
};