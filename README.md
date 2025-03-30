# Portfolio Website

A responsive portfolio website built with React and Express.js.

## Technologies Used

- **Frontend:**
  - React
  - Vite
  - Tailwind CSS
  - Material UI
  - Framer Motion
  - AOS (Animate On Scroll)

- **Backend:**
  - Express.js
  - MongoDB
  - Mongoose
  - Multer (for file uploads)

## Features

- Responsive design for all devices
- Project showcase with filtering capabilities
- Certificate display
- Comment system with image uploads
- Contact form
- Animated UI elements

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or a MongoDB Atlas account)

### Installation

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd Portofolio_V5
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up MongoDB:**
   - Make sure MongoDB is running locally on port 27017 or update the connection string in `server/index.js`

4. **Start the development server:**
   - For frontend only:
     ```
     npm run dev
     ```
   - For backend only:
     ```
     npm run server
     ```
   - For both (frontend + backend):
     ```
     npm run dev:full
     ```

5. **Build for production:**
   ```
   npm run build
   ```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Certificates
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get a specific certificate
- `POST /api/certificates` - Create a new certificate
- `PUT /api/certificates/:id` - Update a certificate
- `DELETE /api/certificates/:id` - Delete a certificate

### Comments
- `GET /api/comments` - Get all comments
- `GET /api/comments/:id` - Get a specific comment
- `POST /api/comments` - Create a new comment (supports file upload)
- `PUT /api/comments/:id` - Update a comment
- `DELETE /api/comments/:id` - Delete a comment

## Project Structure

- `/src` - Frontend React code
- `/server` - Backend Express.js code
  - `/models` - MongoDB models
  - `/controllers` - API controllers
  - `/routes` - API routes
  - `/uploads` - Uploaded files

## License

This project is licensed under the MIT License.

---

# Tutorial: Running the Project  

Here's a simple guide to run this project.  

## Prerequisites  

Ensure that you have already installed:  
- **Node.js**  

---

## Steps to Run the Project  

1. **Download this project:**  

   ```bash  
   git clone https://github.com/EkiZR/Portofolio_V5.git  
   ```  

2. **Install all dependencies:**  

   ```bash  
   npm install  
   ```  
   Or use:  

   ```bash  
   npm install --legacy-peer-deps  
   ```  

3. **Run the project:**  

   ```bash  
   npm run dev  
   ```  

4. **Open in browser:**  

   Access the application through the link displayed in your terminal.  

---

## Creating a Production Build  

To create a production-ready build:  

1. Run the build command:  

   ```bash  
   npm run build  
   ```  

2. The build files will be saved in the `dist` folder. You can upload this folder to your hosting server.  

---

## Notes  

If you encounter issues while running the project, ensure that:  
- Node.js is correctly installed.  
- You're in the correct project directory.  
- All dependencies are installed without errors.  

---

## MongoDB Configuration

To configure MongoDB for this project, follow these steps:

1. **Set Up MongoDB:**
   - Install MongoDB locally or create a MongoDB Atlas account.
   - Create a new database named `portfolio`.

2. **Update Connection String:**
   - If needed, update the MongoDB connection string in `server/index.js`.
   - The default connection is `mongodb://localhost:27017/portfolio`.

3. **Start the Server:**
   - Run the Express server with `npm run server` or both frontend and backend with `npm run dev:full`.

# Portfolio Application

A modern portfolio website showcasing projects and skills.

## Deployment Instructions

This repository includes deployment scripts for pushing your code to GitHub, which can then be automatically deployed via Vercel.

### Windows Users

Use the `deploy.bat` script to quickly commit and push your changes:

```
deploy.bat "Your commit message here"
```

If you run the script without a commit message, it will prompt you to enter one.

### Mac/Linux Users

Use the `deploy.sh` script to quickly commit and push your changes:

```
./deploy.sh "Your commit message here"
```

If you run the script without a commit message, it will prompt you to enter one.

Make sure to give the script execute permissions first:

```
chmod +x deploy.sh
```

## Deployment Process

The deployment scripts will:

1. Add all changes to git
2. Commit with your provided message
3. Push to GitHub
4. Vercel will automatically detect the changes and deploy your application

## Environment Configuration

Make sure your environment variables are properly set up in Vercel:

- For the frontend: Set `VITE_API_URL` to your deployed backend URL
- For the backend: Configure MongoDB connection strings and other necessary variables

## Running Locally

### Frontend

```
npm run dev
```

### Backend

```
node server.js
```

## Troubleshooting

If you encounter issues with deployment:

1. Check your Vercel dashboard for build logs
2. Ensure all environment variables are properly configured
3. Verify your MongoDB connection is accessible from Vercel's servers

