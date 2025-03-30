import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Project schema (matching your actual schema)
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  projectUrl: String,
  githubUrl: String,
  Link: String,
  Github: String,
  Img: String,
  Title: String,
  Description: String,
  TechStack: [String],
  categories: [String],
  featured: Boolean,
  createdAt: Date
}, { timestamps: true });

// Create Project model
const Project = mongoose.model('Project', projectSchema);

// Project updates
const projectUpdates = [
  {
    name: 'MediaAlert',
    demoLink: 'https://medialert.netlify.app/',
    githubLink: 'https://github.com/CodingWith-Shubham/medialertfrontend'
  },
  {
    name: 'NewsWave',
    demoLink: 'https://newswaveindia.netlify.app/',
    githubLink: 'n/a' // No GitHub link provided
  },
  {
    name: 'CloudNotes',
    demoLink: 'https://my-cloud-notes.netlify.app/',
    githubLink: 'https://github.com/CodingWith-Shubham/CloudNotes-Frontend'
  }
];

// Connect to MongoDB and update projects
async function updateProjects() {
  try {
    // Get MongoDB Atlas connection string from environment variable
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('MongoDB URI is not defined in environment variables');
      console.log('Please create a .env file with MONGODB_URI variable');
      process.exit(1);
    }
    
    // Connect to MongoDB Atlas
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB database');
    
    let updatedCount = 0;
    
    // Update each project
    for (const update of projectUpdates) {
      // Create a case-insensitive regex for project name matching
      const nameRegex = new RegExp(update.name, 'i');
      
      // Find the project - check both title and Title fields
      const project = await Project.findOne({
        $or: [
          { title: nameRegex },
          { Title: nameRegex }
        ]
      });
      
      if (project) {
        console.log(`Found project: ${project.title || project.Title}`);
        
        // Update the projectUrl/Link field
        if (project.projectUrl !== undefined) {
          project.projectUrl = update.demoLink;
        } 
        if (project.Link !== undefined) {
          project.Link = update.demoLink;
        }
        
        // Update the githubUrl/Github field
        if (project.githubUrl !== undefined) {
          project.githubUrl = update.githubLink;
        }
        if (project.Github !== undefined) {
          project.Github = update.githubLink;
        }
        
        // Save the updated project
        await project.save();
        console.log(`Updated ${update.name} with new links`);
        updatedCount++;
      } else {
        console.log(`Project ${update.name} not found`);
      }
    }
    
    console.log(`Updated ${updatedCount} projects successfully`);
  } catch (error) {
    console.error('Error updating projects:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

// Run the update function
updateProjects(); 