# Deploying Your Backend to Vercel via GitHub

This guide provides step-by-step instructions for deploying your portfolio backend to Vercel using GitHub integration.

## Prerequisites

1. A [GitHub](https://github.com) account with your code pushed to a repository
2. A [Vercel](https://vercel.com) account
3. Your MongoDB Atlas database (already set up)

## Deployment Steps

### 1. Push Your Code to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for Vercel deployment"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 2. Connect Vercel to Your GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Select "Import Git Repository" and choose your GitHub repository
4. Authorize Vercel to access your GitHub if prompted

### 3. Configure Project Settings

In the Vercel project creation page:

1. **Framework Preset**: Select "Other"
2. **Root Directory**: Keep at `./ `(default)
3. **Build Command**: Leave as default (it will use `vercel-build` from package.json)
4. **Output Directory**: Leave empty
5. **Install Command**: Leave as default (`npm install`)

### 4. Environment Variables

Add the following environment variables:

1. `MONGODB_URI`: Your MongoDB Atlas connection string
   ```
   mongodb+srv://mamgai75:roboticsandAI%40123@cluster0.aoj2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
2. `NODE_ENV`: Set to `production`

### 5. Deploy Your Project

Click "Deploy" and wait for the deployment to complete.

### 6. Verify Deployment

Once deployed:

1. Vercel will provide you with a deployment URL (e.g., `https://your-project.vercel.app`)
2. Test your API endpoint by visiting `https://your-project.vercel.app/api/health`
3. You should see a JSON response indicating your server is running

### 7. Update Frontend Configuration

Update the frontend to use your Vercel deployment:

1. Edit `.env.production` in your frontend project:
   ```
   VITE_API_URL=https://your-project.vercel.app/api
   ```
2. Deploy your frontend or run it locally with production environment:
   ```bash
   npm run build
   npm run preview
   ```

## Continuous Deployment

With GitHub integration, Vercel will automatically deploy when you push changes to your repository:

1. Make changes to your code
2. Commit and push to GitHub
3. Vercel will automatically detect changes and deploy the new version

## Troubleshooting

If you encounter issues:

1. **Deployment Fails**: Check Vercel build logs for errors
2. **MongoDB Connection Issues**: Verify your MongoDB Atlas connection string and ensure network access is configured correctly
3. **API not responding**: Check that your routes are correctly prefixed with `/api`
4. **CORS errors**: Verify CORS settings in your server code allow requests from your frontend domain

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Integration](https://vercel.com/docs/concepts/git/vercel-for-github)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) 