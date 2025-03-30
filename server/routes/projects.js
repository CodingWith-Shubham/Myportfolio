import express from 'express';
import { 
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// Middleware to transform field names for frontend consistency
const transformProjectFields = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Check if it's a JSON response with project data
    if (data && typeof data === 'string') {
      try {
        const parsedData = JSON.parse(data);
        
        // If it's an array (multiple projects)
        if (Array.isArray(parsedData)) {
          const transformedProjects = parsedData.map(transformProject);
          return originalSend.call(this, JSON.stringify(transformedProjects));
        } 
        // If it's a single project object
        else if (parsedData._id) {
          const transformedProject = transformProject(parsedData);
          return originalSend.call(this, JSON.stringify(transformedProject));
        }
      } catch (error) {
        // Not JSON or other error, just continue
      }
    }
    
    // Default: send the original data
    return originalSend.call(this, data);
  };
  
  next();
};

// Function to transform a project object
function transformProject(project) {
  // Create a new object with standardized field names
  return {
    ...project,
    id: project._id,
    Title: project.title || project.Title,
    Description: project.description || project.Description,
    Img: project.imageUrl || project.Img,
    Link: project.projectUrl || project.Link,
    Github: project.githubUrl || project.Github
  };
}

// Apply the transformation middleware to all routes
router.use(transformProjectFields);

// GET all projects
router.get('/', getProjects);

// GET a single project
router.get('/:id', getProjectById);

// POST new project
router.post('/', createProject);

// PUT update project
router.put('/:id', updateProject);

// DELETE project
router.delete('/:id', deleteProject);

export default router; 