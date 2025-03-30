# Firebase to Express.js Migration

This document outlines the steps taken to migrate the portfolio application from Firebase to Express.js with MongoDB.

## Changes Made

### Backend

1. **Express.js Server Setup**
   - Created a server directory with Express.js application
   - Added MongoDB integration with Mongoose
   - Set up CORS and other middleware
   - Added error handling

2. **MongoDB Models**
   - Created Mongoose models for:
     - Projects
     - Certificates
     - Comments
   - Defined schemas that match the Firebase data structure

3. **API Controllers**
   - Implemented CRUD operations for all data types
   - Created file upload functionality for comment profile images using Multer

4. **API Routes**
   - Set up RESTful routes for all resources
   - Implemented file handling for uploads

### Frontend

1. **API Service**
   - Created a unified API service layer (`src/services/api.js`)
   - Implemented methods for all data operations
   - Added FormData handling for file uploads

2. **Component Updates**
   - Replaced Firebase imports with API service imports
   - Updated data fetching logic in Portfolio and Comment components
   - Updated the timestamp handling for comments

3. **Configuration**
   - Removed Firebase configuration files
   - Updated package.json with new dependencies
   - Added script to run both client and server concurrently

## Benefits of Migration

1. **Full Control**: Complete control over the backend and data storage
2. **Cost Efficiency**: Reduced dependency on third-party services
3. **Customization**: Easier to customize API responses and behavior
4. **Scalability**: Better control over scaling the application
5. **Local Development**: Simpler local development environment with MongoDB

## Running the Application

To run the application after migration:

1. Install dependencies:
   ```
   npm install
   ```

2. Start MongoDB locally or update the connection string in `server/index.js`

3. Run both frontend and backend:
   ```
   npm run dev:full
   ```

4. Or run them separately:
   ```
   npm run dev       # Frontend only
   npm run server    # Backend only
   ``` 