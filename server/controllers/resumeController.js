import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesDir = path.resolve(__dirname, '../files');

export const downloadPdfResume = (req, res) => {
  const filePath = path.join(filesDir, 'Aryan_Chaturvedi_Resume.pdf');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      error: 'Resume PDF file not found'
    });
  }

  return res.download(filePath, 'Aryan_Chaturvedi_Resume.pdf', (err) => {
    if (err && !res.headersSent) {
      console.error('Error downloading resume PDF:', err.message);
      res.status(500).json({
        success: false,
        error: 'Failed to download resume file'
      });
    }
  });
};

export const downloadDocxResume = (req, res) => {
  const filePath = path.join(filesDir, 'Aryan_Chaturvedi_Resume.docx');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      error: 'Resume DOCX file not found'
    });
  }

  return res.download(filePath, 'Aryan_Chaturvedi_Resume.docx', (err) => {
    if (err && !res.headersSent) {
      console.error('Error downloading resume DOCX:', err.message);
      res.status(500).json({
        success: false,
        error: 'Failed to download resume file'
      });
    }
  });
};
