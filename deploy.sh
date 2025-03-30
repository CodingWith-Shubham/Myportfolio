#!/bin/bash

# Simple deployment script for GitHub/Vercel

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install git and try again.${NC}"
    exit 1
fi

# Get commit message from arguments or prompt
if [ -z "$1" ]; then
    echo -e "${YELLOW}Enter commit message:${NC}"
    read commitMessage
else
    commitMessage="$1"
fi

echo -e "${GREEN}Starting deployment process...${NC}"

# Add all files
echo -e "${YELLOW}Adding files to git...${NC}"
git add .

# Commit changes
echo -e "${YELLOW}Committing changes with message: ${commitMessage}${NC}"
git commit -m "$commitMessage"

# Check if we need to set up remote
REMOTE_EXISTS=$(git remote -v | grep -c origin)
if [ $REMOTE_EXISTS -eq 0 ]; then
    echo -e "${YELLOW}No remote 'origin' found. Enter your GitHub repository URL:${NC}"
    read repoUrl
    git remote add origin $repoUrl
fi

# Push to GitHub
echo -e "${YELLOW}Pushing to GitHub...${NC}"
git push -u origin main || git push -u origin master

echo -e "${GREEN}Deployment complete! Your code has been pushed to GitHub.${NC}"
echo -e "${YELLOW}Vercel will automatically detect changes and deploy your application.${NC}"
echo -e "${YELLOW}Check your Vercel dashboard for deployment status.${NC}"

exit 0 