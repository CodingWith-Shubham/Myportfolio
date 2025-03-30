import axios from 'axios';

// Replace this with your deployed API URL
const API_URL = 'https://your-portfolio-api.vercel.app/api';

// The links to be updated
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

// Function to get all projects
async function getProjects() {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}

// Function to update a project
async function updateProject(id, projectData) {
  try {
    const response = await axios.put(`${API_URL}/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw error;
  }
}

// Main function to update projects
async function updateProjectLinks() {
  try {
    // Get all projects
    const projects = await getProjects();
    console.log(`Found ${projects.length} projects`);
    
    // Create a mapping of project names (case-insensitive) to their IDs and data
    const projectMap = new Map();
    
    for (const project of projects) {
      const title = project.title || project.Title;
      if (title) {
        projectMap.set(title.toLowerCase(), { id: project._id, data: project });
      }
    }
    
    // Update each project in the list
    for (const update of projectUpdates) {
      // Find the project by name (case-insensitive)
      const projectName = update.name.toLowerCase();
      
      // Check if we have an exact match
      if (projectMap.has(projectName)) {
        const { id, data } = projectMap.get(projectName);
        
        // Build update object based on the actual field names in the data
        const updateData = { ...data };
        
        // Update the links based on what fields exist in the data
        if ('projectUrl' in data) {
          updateData.projectUrl = update.demoLink;
        } else if ('Link' in data) {
          updateData.Link = update.demoLink;
        }
        
        if ('githubUrl' in data) {
          updateData.githubUrl = update.githubLink;
        } else if ('Github' in data) {
          updateData.Github = update.githubLink;
        }
        
        // Update the project
        await updateProject(id, updateData);
        console.log(`Updated ${update.name} with new links`);
      } else {
        // Check for partial matches
        let found = false;
        for (const [key, { id, data }] of projectMap.entries()) {
          if (key.includes(projectName) || projectName.includes(key)) {
            // Build update object based on the actual field names in the data
            const updateData = { ...data };
            
            // Update the links based on what fields exist in the data
            if ('projectUrl' in data) {
              updateData.projectUrl = update.demoLink;
            } else if ('Link' in data) {
              updateData.Link = update.demoLink;
            }
            
            if ('githubUrl' in data) {
              updateData.githubUrl = update.githubLink;
            } else if ('Github' in data) {
              updateData.Github = update.githubLink;
            }
            
            // Update the project
            await updateProject(id, updateData);
            console.log(`Updated ${key} with ${update.name} links`);
            found = true;
            break;
          }
        }
        
        if (!found) {
          console.log(`Project ${update.name} not found`);
        }
      }
    }
    
    console.log('Project links update completed.');
  } catch (error) {
    console.error('Error updating project links:', error);
  }
}

// Run the update function
updateProjectLinks(); 