import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

const router = express.Router();

// GET all comments
router.get('/', getComments);

// GET single comment
router.get('/:id', getCommentById);

// POST new comment with optional file upload
router.post('/', upload.single('profileImage'), createComment);

// PUT update comment
router.put('/:id', updateComment);

// DELETE comment
router.delete('/:id', deleteComment);

export default router; 