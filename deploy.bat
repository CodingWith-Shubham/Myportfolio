@echo off
setlocal enabledelayedexpansion

:: Colors for Windows console
set "GREEN=[92m"
set "YELLOW=[93m"
set "RED=[91m"
set "BLUE=[94m"
set "RESET=[0m"

echo %GREEN%Starting deployment process...%RESET%

:: Check if Git is installed
where git >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo %RED%Error: Git is not installed or not in PATH. Please install Git and try again.%RESET%
    exit /b 1
)

:: Use provided commit message or prompt for one
set "commit_message=%~1"
if "!commit_message!"=="" (
    echo %YELLOW%Please enter a commit message:%RESET%
    set /p commit_message=
)

:: Check if a commit message was provided
if "!commit_message!"=="" (
    echo %RED%Error: A commit message is required.%RESET%
    exit /b 1
)

echo %BLUE%Adding all files to git...%RESET%
git add .

echo %BLUE%Committing changes with message: "!commit_message!"...%RESET%
git commit -m "!commit_message!"

:: Check if remote origin exists
git remote -v | find "origin" >nul
if %ERRORLEVEL% neq 0 (
    echo %YELLOW%No remote repository found. Please enter your GitHub repository URL:%RESET%
    set /p repo_url=
    
    if "!repo_url!"=="" (
        echo %RED%Error: Repository URL is required.%RESET%
        exit /b 1
    )
    
    echo %BLUE%Adding remote repository...%RESET%
    git remote add origin !repo_url!
)

:: Push to GitHub - trying both main and master branches
echo %BLUE%Pushing to GitHub...%RESET%
git push -u origin main 2>nul
if %ERRORLEVEL% neq 0 (
    echo %YELLOW%Branch 'main' not found, trying 'master'...%RESET%
    git push -u origin master 2>nul
    if %ERRORLEVEL% neq 0 (
        echo %RED%Failed to push to GitHub. Please check your repository settings and try again.%RESET%
        exit /b 1
    )
)

echo %GREEN%Deployment complete! Vercel will automatically detect changes and deploy your application.%RESET%
echo %GREEN%Visit your Vercel dashboard to monitor the deployment.%RESET%

endlocal 