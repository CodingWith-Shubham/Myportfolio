import axios from 'axios';

// API base URL (local server) - using 127.0.0.1 instead of localhost
const API_URL = 'http://127.0.0.1:5000/api';

// Test API endpoints
async function testApi() {
  console.log('Testing API endpoints...\n');
  
  try {
    // Test projects endpoint
    console.log('Testing GET /projects:');
    try {
      const projectsResponse = await axios.get(`${API_URL}/projects`);
      console.log(`Status: ${projectsResponse.status}`);
      console.log(`Found ${projectsResponse.data.length} projects`);
      
      if (projectsResponse.data.length > 0) {
        console.log('Sample project:');
        console.log(JSON.stringify(projectsResponse.data[0], null, 2).substring(0, 200) + '...');
      }
    } catch (error) {
      console.error('Error accessing projects endpoint:', error.message);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log(`Message: ${JSON.stringify(error.response.data)}`);
      }
    }
    
    // Test comments endpoint
    console.log('\nTesting GET /comments:');
    try {
      const commentsResponse = await axios.get(`${API_URL}/comments`);
      console.log(`Status: ${commentsResponse.status}`);
      console.log(`Found ${commentsResponse.data.length} comments`);
      
      if (commentsResponse.data.length > 0) {
        console.log('Sample comment:');
        console.log(JSON.stringify(commentsResponse.data[0], null, 2).substring(0, 200) + '...');
      }
    } catch (error) {
      console.error('Error accessing comments endpoint:', error.message);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log(`Message: ${JSON.stringify(error.response.data)}`);
      }
    }
    
    // Test certificates endpoint
    console.log('\nTesting GET /certificates:');
    try {
      const certificatesResponse = await axios.get(`${API_URL}/certificates`);
      console.log(`Status: ${certificatesResponse.status}`);
      console.log(`Found ${certificatesResponse.data.length} certificates`);
      
      if (certificatesResponse.data.length > 0) {
        console.log('Sample certificate:');
        console.log(JSON.stringify(certificatesResponse.data[0], null, 2).substring(0, 200) + '...');
      }
    } catch (error) {
      console.error('Error accessing certificates endpoint:', error.message);
      if (error.response) {
        console.log(`Status: ${error.response.status}`);
        console.log(`Message: ${JSON.stringify(error.response.data)}`);
      }
    }
    
  } catch (error) {
    console.error('General error testing API:', error.message);
  }
}

// Run the test
testApi(); 