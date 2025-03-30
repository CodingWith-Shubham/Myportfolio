import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function checkDatabase() {
  try {
    // Get MongoDB connection string from environment variable
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('MongoDB URI is not defined in environment variables');
      process.exit(1);
    }
    
    console.log('Connecting to MongoDB Atlas...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('Connected to MongoDB Atlas successfully');
    
    // Get database information
    const db = mongoose.connection.db;
    
    // List all collections
    console.log('\nCollections in database:');
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log('No collections found in the database');
    } else {
      for (const collection of collections) {
        console.log(`- ${collection.name}`);
        
        // Count documents in each collection
        const count = await db.collection(collection.name).countDocuments();
        console.log(`  Documents: ${count}`);
        
        // Show a sample document from each collection
        if (count > 0) {
          const sample = await db.collection(collection.name).findOne();
          console.log('  Sample document:');
          console.log('  ', JSON.stringify(sample, null, 2).substring(0, 150) + '...');
        }
      }
    }
    
    // Specifically check for projects collection
    console.log('\nChecking projects collection:');
    const projectsCollection = collections.find(c => c.name === 'projects');
    
    if (!projectsCollection) {
      console.log('Projects collection not found');
    } else {
      const projects = await db.collection('projects').find().toArray();
      console.log(`Found ${projects.length} projects:`);
      
      for (const project of projects) {
        console.log(`- ${project.title || project.Title || 'Unnamed project'} (ID: ${project._id})`);
      }
    }
    
    // Specifically check for comments collection
    console.log('\nChecking comments collection:');
    const commentsCollection = collections.find(c => c.name === 'comments');
    
    if (!commentsCollection) {
      console.log('Comments collection not found');
    } else {
      const comments = await db.collection('comments').find().toArray();
      console.log(`Found ${comments.length} comments`);
    }
    
  } catch (error) {
    console.error('Error checking database:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  }
}

// Run the check function
checkDatabase(); 