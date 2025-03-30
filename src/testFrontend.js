import { getProjects, getComments, getCertificates } from './services/api.js';

// Helper function to simulate a frontend test
async function testFrontendApi() {
  try {
    console.log('Testing frontend API calls...');
    
    // Test projects API
    console.log('\nTesting getProjects():');
    try {
      const projects = await getProjects();
      console.log(`Retrieved ${projects.length} projects`);
      
      // Display project details
      projects.forEach(project => {
        console.log(`- ${project.title || project.Title}`);
        console.log(`  Demo: ${project.Link || project.projectUrl || 'Not set'}`);
        console.log(`  GitHub: ${project.Github || project.githubUrl || 'Not set'}`);
      });
    } catch (error) {
      console.error('Error retrieving projects:', error.message);
    }
    
    // Test comments API
    console.log('\nTesting getComments():');
    try {
      const comments = await getComments();
      console.log(`Retrieved ${comments.length} comments`);
      
      // Display comment details
      comments.forEach(comment => {
        console.log(`- ${comment.userName}: "${comment.content}"`);
      });
    } catch (error) {
      console.error('Error retrieving comments:', error.message);
    }
    
    // Test certificates API
    console.log('\nTesting getCertificates():');
    try {
      const certificates = await getCertificates();
      console.log(`Retrieved ${certificates.length} certificates`);
    } catch (error) {
      console.error('Error retrieving certificates:', error.message);
    }
    
  } catch (error) {
    console.error('General error testing frontend API:', error.message);
  }
}

// Call the test function
testFrontendApi();

// Note: To run this file directly, you'll need to modify the import to work with Node.js
// For browser testing, you can paste the modified version in your browser console 