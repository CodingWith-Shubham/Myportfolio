# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for your portfolio website and update your project links.

## Setting up MongoDB Atlas

1. **Create a MongoDB Atlas account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a new cluster**
   - Once logged in, click "Build a Database"
   - Choose the free tier option (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Set up database access**
   - In the left sidebar, go to "Database Access"
   - Click "Add New Database User"
   - Create a username and password (save these securely)
   - Set privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure network access**
   - In the left sidebar, go to "Network Access"
   - Click "Add IP Address"
   - To allow access from anywhere (for development), click "Allow Access From Anywhere"
   - Click "Confirm"

5. **Get your connection string**
   - Go back to your cluster
   - Click "Connect"
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your database user credentials

## Setting up your project

1. **Create a .env file**
   - Create a file named `.env` in your server directory
   - Add the following content:
   ```
   # MongoDB Atlas Configuration
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio?retryWrites=true&w=majority
   
   # Server Configuration
   PORT=5000
   
   # Node Environment
   NODE_ENV=development
   ```
   - Replace the `MONGODB_URI` with your actual connection string
   
2. **Install dotenv package**
   - Run `npm install dotenv`

## Updating your project links

After setting up MongoDB Atlas, you can update your project links using the provided script:

1. **Make sure your server is connected to MongoDB Atlas**
   - Start your server to test the connection

2. **Run the update script**
   - From the project root directory, run:
   ```
   npm run update-projects
   ```
   - This will update the links for MediaAlert, NewsWave, and CloudNotes projects

## Project Links

Here are the links that will be updated:

- **MediaAlert**
  - Demo: https://medialert.netlify.app/
  - GitHub: https://github.com/CodingWith-Shubham/medialertfrontend

- **NewsWave**
  - Demo: https://newswaveindia.netlify.app/
  - GitHub: n/a

- **CloudNotes**
  - Demo: https://my-cloud-notes.netlify.app/
  - GitHub: https://github.com/CodingWith-Shubham/CloudNotes-Frontend

## Troubleshooting

If you encounter any issues:

1. **Check your MongoDB Atlas connection**
   - Verify that the connection string is correct
   - Make sure your IP address is whitelisted

2. **Check project names**
   - The script searches for projects with names similar to "MediaAlert", "NewsWave", and "CloudNotes"
   - Make sure your project names match or are similar 