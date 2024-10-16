const QRCode = require('qrcode');
const crypto = require('crypto');

const generateQRCode = async (outpassId) => {
  const secret = process.env.QR_SECRET || 'your-secret-key';
  const timestamp = Date.now();
  const data = `${outpassId}|${timestamp}`;
  const hash = crypto.createHmac('sha256', secret).update(data).digest('hex');
  const qrData = `${data}|${hash}`;
  
  try {
    const qrCodeDataURL = await QRCode.toDataURL(qrData);
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

module.exports = generateQRCode;