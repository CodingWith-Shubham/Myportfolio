# Portfolio Deployment Guide

This guide covers how to deploy both the backend and frontend of your portfolio application.

## Deploying the Backend to Vercel

### Prerequisites
- A [Vercel](https://vercel.com) account
- Your MongoDB Atlas database (already set up)
- Git installed on your machine

### Step 1: Prepare your repository
Make sure all changes are committed to your repository.

### Step 2: Deploy to Vercel
There are two ways to deploy to Vercel:

#### Option 1: Using the Vercel CLI
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy your project:
   ```bash
   vercel
   ```

4. Follow the prompts to complete the deployment.

#### Option 2: Using the Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click "Add New" > "Project".
3. Import your Git repository.
4. Configure the project:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm run build:server`
   - Output Directory: N/A
   - Install Command: `npm install`
   - Development Command: `npm run dev:full`

5. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: Set to `production`

6. Click "Deploy" and wait for the deployment to complete.

### Step 3: Verify your backend deployment
Visit `https://your-vercel-domain.vercel.app/api/health` to confirm the backend is running.

## Deploying the Frontend

You have several options for deploying the frontend:

### Option 1: Deploy frontend to Vercel (separate from backend)

1. Create a new repository for just the frontend code.
2. Update the `.env.production` file with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

3. Deploy to Vercel following similar steps as the backend.

### Option 2: Deploy frontend to Netlify

1. Create an account on [Netlify](https://netlify.com).
2. Click "Add new site" > "Import an existing project".
3. Connect your repository.
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

5. Add environment variables:
   - `VITE_API_URL`: Your backend API URL

6. Click "Deploy site".

### Option 3: Manual deployment to hosting provider

1. Build your frontend:
   ```bash
   npm run build
   ```

2. Upload the contents of the `dist` directory to your hosting provider (e.g., AWS S3, Firebase Hosting, etc.).

## Connecting Frontend to Backend

After deploying both services:

1. Update the `.env.production` file in your frontend repository with your backend URL:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

2. Redeploy your frontend to apply the changes.

## Troubleshooting

### CORS Issues
If you encounter CORS errors:

1. Verify the CORS configuration in your backend (`server/index.js`):
   ```javascript
   app.use((req, res, next) => {
     res.header('Access-Control-Allow-Origin', '*');
     // ... other CORS settings
   });
   ```

2. For production, consider updating the CORS configuration to only allow specific origins:
   ```javascript
   const allowedOrigins = ['https://your-frontend-domain.com'];
   app.use((req, res, next) => {
     const origin = req.headers.origin;
     if (allowedOrigins.includes(origin)) {
       res.header('Access-Control-Allow-Origin', origin);
     }
     // ... other CORS settings
   });
   ```

### Database Connection Issues
- Ensure your MongoDB Atlas cluster is accessible from Vercel's IPs.
- Check that your connection string is correctly set in the environment variables.

### Missing Environment Variables
- Verify all required environment variables are set in your deployment environment.

## Continuous Deployment

For automatic deployments:

1. Connect your Git repository to your deployment platform.
2. Configure the deployment settings to automatically build and deploy on pushes to main/master.

## Monitoring and Logging

For server-side logging:
- Use Vercel's built-in logging: `vercel logs your-project-name`

For client-side monitoring:
- Consider adding services like [Sentry](https://sentry.io) or [LogRocket](https://logrocket.com). 