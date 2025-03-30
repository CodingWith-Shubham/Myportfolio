# Deploying Your Portfolio Backend to Vercel

This guide will help you deploy your portfolio's backend server to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. Your MongoDB Atlas database (already set up)
3. Git installed on your machine

## Setup Steps

### 1. Prepare your code

Your project has already been configured for Vercel deployment with:
- A `vercel.json` configuration file
- Updated `server/index.js` with Vercel compatibility
- API route handler in `api/index.js`

### 2. Install Vercel CLI

```bash
npm install -g vercel
```

### 3. Login to Vercel

```bash
vercel login
```

### 4. Configure Environment Variables

Before deploying, you'll need to set up your environment variables on Vercel:

1. Log in to the Vercel dashboard
2. Create a new project or select your existing project
3. Go to "Settings" > "Environment Variables"
4. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: Set to `production`

You can also set these via the Vercel CLI:

```bash
vercel env add MONGODB_URI
vercel env add NODE_ENV production
```

### 5. Deploy to Vercel

Run the following command in your project directory:

```bash
vercel
```

Follow the prompts to deploy your project. When asked about the build settings, you can use the defaults.

### 6. Check Your Deployment

Once deployed, Vercel will provide you with a URL for your backend. You can test it by visiting:

```
https://your-vercel-domain.vercel.app/api/health
```

You should see a response indicating your server is running.

### 7. Update Your Frontend API Configuration

Update your frontend to use the new backend URL:

```javascript
// Example in your frontend code
const API_URL = 'https://your-vercel-domain.vercel.app';
```

## Troubleshooting

If you encounter issues:

1. Check Vercel logs:
   ```bash
   vercel logs your-project-name
   ```

2. Verify your environment variables are correctly set in the Vercel dashboard.

3. Make sure MongoDB IP access list includes Vercel's IPs (or is set to allow access from anywhere).

## Setting Up Continuous Deployment

For automatic deployments whenever you push to your GitHub repository:

1. Connect your GitHub repository to Vercel
2. Configure the production branch
3. Push changes to trigger automatic deployments

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel for Express.js](https://vercel.com/guides/using-express-with-vercel)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/) 