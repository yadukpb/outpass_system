const PDFDocument = require('pdfkit');

const generatePDF = (outpass) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Add outpass details and QR code to the PDF
    doc.fontSize(18).text('Outpass Details', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Outpass ID: ${outpass._id}`);
    doc.text(`Student Name: ${outpass.personalInfo.name}`);
    doc.text(`Destination: ${outpass.destination}`);
    doc.text(`Date of Leaving: ${outpass.dateOfLeaving}`);
    doc.text(`Date of Return: ${outpass.dateOfReturn}`);
    doc.text(`Status: ${outpass.status}`);
    
    if (outpass.qrCode) {
      doc.image(outpass.qrCode, { width: 150, height: 150 });
    }

    doc.end();
  });
};

module.exports = generatePDF;