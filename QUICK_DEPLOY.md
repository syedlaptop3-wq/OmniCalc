# Quick Deploy Commands

Run these commands in your terminal (PowerShell or Command Prompt):

```powershell
# Navigate to project
cd C:\Users\123\Desktop\OmniCalc

# Add all files
git add .

# Commit changes
git commit -m "Add automated deployment and fix console errors"

# Push to GitHub (use 'master' if that's your branch)
git push origin main
```

After pushing:
1. Go to GitHub repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Go to Actions tab to watch deployment
4. Wait 1-2 minutes
5. Visit https://syedlaptop3-wq.github.io/OmniCalc/
6. Check console (F12) - no more errors! ✅
