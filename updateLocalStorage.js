// Script to update project links in localStorage
// Run this in the browser console after the website loads

function updateProjectLinksInLocalStorage() {
  // Get the current projects from localStorage
  const projectsJson = localStorage.getItem('projects');
  if (!projectsJson) {
    console.error('No projects found in localStorage');
    return;
  }
  
  // Parse the projects
  const projects = JSON.parse(projectsJson);
  console.log(`Found ${projects.length} projects in localStorage`);
  
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
  
  // Update projects
  let updatedCount = 0;
  
  for (const project of projects) {
    // Get the project title (could be in title or Title field)
    const projectTitle = project.title || project.Title;
    if (!projectTitle) continue;
    
    // Check if this project matches any in our update list
    for (const update of projectUpdates) {
      // Case-insensitive comparison and check for partial matches
      if (
        projectTitle.toLowerCase().includes(update.name.toLowerCase()) || 
        update.name.toLowerCase().includes(projectTitle.toLowerCase())
      ) {
        console.log(`Updating project: ${projectTitle}`);
        
        // Update Link/projectUrl
        if ('Link' in project) {
          project.Link = update.demoLink;
        } else if ('projectUrl' in project) {
          project.projectUrl = update.demoLink;
        }
        
        // Update Github/githubUrl
        if ('Github' in project) {
          project.Github = update.githubLink;
        } else if ('githubUrl' in project) {
          project.githubUrl = update.githubLink;
        }
        
        updatedCount++;
        break; // Move to the next project once we've found a match
      }
    }
  }
  
  if (updatedCount > 0) {
    // Save the updated projects back to localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log(`Updated ${updatedCount} projects in localStorage`);
    console.log('Please refresh the page to see the changes');
  } else {
    console.log('No matching projects found to update');
  }
}

// Run the function
updateProjectLinksInLocalStorage();

// Instructions for use:
// 1. Open your website in a browser
// 2. Open the browser's developer console (F12 or right-click > Inspect > Console)
// 3. Copy and paste this entire script into the console
// 4. Press Enter to run it
// 5. Refresh the page to see the changes 