import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function checkProjectFields() {
  try {
    // MongoDB Atlas connection string - using the direct string for now
    const MONGODB_URI = 'mongodb+srv://mamgai75:roboticsandAI%40123@cluster0.aoj2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB Atlas');
    
    // Get database instance
    const db = mongoose.connection.db;
    
    // Get all projects
    const projects = await db.collection('projects').find().toArray();
    
    console.log(`Found ${projects.length} projects\n`);
    
    // Display all field names for each project
    projects.forEach((project, index) => {
      console.log(`Project ${index + 1}: ${project.title || project.Title || 'Unnamed project'}`);
      console.log('Fields:');
      
      Object.keys(project).forEach(key => {
        let value = project[key];
        // Format the value for display
        if (typeof value === 'object') {
          value = JSON.stringify(value).substring(0, 50) + '...';
        } else if (typeof value === 'string') {
          value = value.substring(0, 50) + (value.length > 50 ? '...' : '');
        }
        
        console.log(`  ${key}: ${value}`);
      });
      
      console.log(''); // Add empty line between projects
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  }
}

// Run the function
checkProjectFields(); 