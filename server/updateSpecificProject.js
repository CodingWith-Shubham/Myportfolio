import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function updateSpecificProject() {
  try {
    // Get MongoDB connection string from environment variable
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.error('MongoDB URI is not defined in environment variables');
      process.exit(1);
    }
    
    // Connect to MongoDB Atlas
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB database');
    
    // Get database instance
    const db = mongoose.connection.db;
    
    // Update MediAlert project with the correct links
    const result = await db.collection('projects').updateOne(
      { title: "MediAlert" }, // Find by title
      { 
        $set: { 
          Link: "https://medialert.netlify.app/",
          Github: "https://github.com/CodingWith-Shubham/medialertfrontend"
        }
      }
    );
    
    if (result.matchedCount === 0) {
      // Try with a different field name (Title vs title)
      const resultAlt = await db.collection('projects').updateOne(
        { Title: "MediAlert" }, // Find by Title (capital T)
        { 
          $set: { 
            Link: "https://medialert.netlify.app/",
            Github: "https://github.com/CodingWith-Shubham/medialertfrontend"
          }
        }
      );
      
      if (resultAlt.matchedCount === 0) {
        console.log("MediAlert project not found. Trying with partial match...");
        
        // Try with a partial match using regex
        const resultPartial = await db.collection('projects').updateOne(
          { 
            $or: [
              { title: { $regex: "medi", $options: "i" } },
              { Title: { $regex: "medi", $options: "i" } }
            ]
          },
          { 
            $set: { 
              Link: "https://medialert.netlify.app/",
              Github: "https://github.com/CodingWith-Shubham/medialertfrontend"
            }
          }
        );
        
        if (resultPartial.matchedCount === 0) {
          console.log("Could not find MediAlert project with any method");
        } else {
          console.log(`Updated MediAlert project (by partial match): ${resultPartial.modifiedCount} document modified`);
        }
      } else {
        console.log(`Updated MediAlert project (by Title): ${resultAlt.modifiedCount} document modified`);
      }
    } else {
      console.log(`Updated MediAlert project (by title): ${result.modifiedCount} document modified`);
    }
    
    // Now verify the updates
    const projects = await db.collection('projects').find().toArray();
    
    console.log("\nCurrent projects data:");
    for (const project of projects) {
      console.log(`- ${project.title || project.Title}`);
      console.log(`  Demo Link: ${project.Link || project.projectUrl || 'Not set'}`);
      console.log(`  GitHub: ${project.Github || project.githubUrl || 'Not set'}`);
    }
    
  } catch (error) {
    console.error('Error updating project:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  }
}

// Run the update function
updateSpecificProject(); 