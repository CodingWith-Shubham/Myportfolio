import express from 'express';
import { 
  getCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController.js';

const router = express.Router();

// GET all certificates
router.get('/', getCertificates);

// GET single certificate
router.get('/:id', getCertificateById);

// POST new certificate
router.post('/', createCertificate);

// PUT update certificate
router.put('/:id', updateCertificate);

// DELETE certificate
router.delete('/:id', deleteCertificate);

export default router; 