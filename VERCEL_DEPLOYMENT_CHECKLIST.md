# Vercel Deployment Checklist

## Environment Variables to Configure in Vercel Dashboard

1. **MONGODB_URI**
   ```
   mongodb+srv://mamgai75:roboticsandAI%40123@cluster0.aoj2d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

2. **NODE_ENV**
   ```
   production
   ```

3. **VITE_API_URL** (for frontend build)
   ```
   https://portofolio-v5.vercel.app/api
   ```

## Deployment Steps

1. **Connect GitHub Repository to Vercel**
   - Go to Vercel Dashboard: https://vercel.com/dashboard
   - Import your GitHub repository

2. **Configure Project Settings**
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install

3. **Add Environment Variables**
   - Add all environment variables from the list above

4. **Deploy**
   - Click "Deploy" button
   - Vercel will automatically build and deploy your application

## Verify Deployment

1. **Check Frontend**
   - Visit your Vercel deployment URL: https://portofolio-v5.vercel.app
   - Ensure all pages load properly
   - Verify projects are displaying correctly

2. **Check Backend API**
   - Test API endpoint: https://portofolio-v5.vercel.app/api/health
   - It should return a JSON response indicating the server is running

## Troubleshooting

If you encounter any issues:

1. **Check Build Logs**
   - Review the build logs in the Vercel dashboard to identify any errors

2. **MongoDB Connection Issues**
   - Ensure your MongoDB Atlas connection string is correct
   - Verify that your IP is whitelisted in MongoDB Atlas

3. **Environment Variables**
   - Make sure all required environment variables are correctly set

4. **CORS Issues**
   - Check server/index.js to ensure CORS is properly configured
   - Add your Vercel deployment URL to the allowed origins

5. **File Paths**
   - Ensure all file paths in your code are relative and not absolute 