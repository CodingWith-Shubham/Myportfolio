import Certificate from '../models/Certificate.js';

// Get all certificates
export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ date: -1 });
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single certificate by id
export const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new certificate
export const createCertificate = async (req, res) => {
  const newCertificate = new Certificate(req.body);
  
  try {
    await newCertificate.save();
    res.status(201).json(newCertificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a certificate
export const updateCertificate = async (req, res) => {
  try {
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.status(200).json(updatedCertificate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a certificate
export const deleteCertificate = async (req, res) => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);
    
    if (!deletedCertificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    res.status(200).json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 