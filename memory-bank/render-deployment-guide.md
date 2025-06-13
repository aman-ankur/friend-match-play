# Render Deployment Guide: Safe vs Full Content

## Overview

This guide covers deploying the backend server to Render with two content modes:
- **Safe Mode**: Only general audience content (rating 1-6) - Perfect for public showcasing
- **Full Mode**: Complete content including enhanced questions (rating 7-10) and exclusive content (rating 11)

## Pre-Deployment Setup

### 1. Repository Structure Check
Ensure your repository has:
```
server/
├── src/
│   ├── gameUtils.ts          # Contains safe questions only
│   ├── sensitiveQuestions.ts # Git-ignored, contains enhanced content
│   └── sensitiveQuestions.template.ts # Template for setup
├── package.json
└── generate-env-data.js      # Helper script for full deployment
```

### 2. Verify .gitignore Configuration
Confirm `server/src/sensitiveQuestions.ts` is in `.gitignore`:
```bash
grep "sensitiveQuestions.ts" .gitignore
# Should show: server/src/sensitiveQuestions.ts
```

## Option A: Safe Mode Deployment (Default)

**Best for**: Public portfolios, professional showcases, initial deployments

### Step 1: Create Render Service
1. Go to [render.com](https://render.com) and log in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure service:
   - **Name**: `friend-match-play-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### Step 2: Set Environment Variables
In Render service settings, add:
```
VITE_SOCKET_URL = https://your-vercel-app.vercel.app
PORT = (leave empty - auto-assigned)
```

### Step 3: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Check logs for: `"Sensitive questions file not found - adult content modes will be disabled"`

### Step 4: Verify Safe Deployment
Your app will work with:
- ✅ All core functionality
- ✅ General audience questions (rating 1-6)
- ❌ Enhanced content modes disabled
- ❌ PIN-protected exclusive mode disabled

---

## Option B: Full Mode Deployment (Enhanced Content)

**Best for**: Production apps, complete feature sets, when you need all content

### Step 1: Generate Environment Data Locally

**Run this on your local machine where `sensitiveQuestions.ts` exists:**

```bash
cd server
node generate-env-data.js
```

**Expected output:**
```
🎯 PRODUCTION DEPLOYMENT GUIDE
=============================

To deploy with enhanced content, set this environment variable on Render:

Variable Name: SENSITIVE_QUESTIONS_DATA
Variable Value:
```
{"sensitiveThisOrThatQuestions":[...],"sensitiveAllModeQuestions":[...]}
```

📊 This includes:
   - 56 ultra-sensitive questions (rating 11)
   - 189 enhanced questions (rating 7-10)

⚠️  WARNING: This contains sensitive content. Use appropriate security measures.
```

### Step 2: Copy the Environment Variable Value
1. **Select and copy** the entire JSON string (the long line starting with `{"sensitiveThisOrThatQuestions":`)
2. **Keep this data secure** - it contains sensitive content

### Step 3: Create/Update Render Service
Follow Option A steps 1-2, then add the additional environment variable:

In Render service settings, add all environment variables:
```
VITE_SOCKET_URL = https://your-vercel-app.vercel.app
SENSITIVE_QUESTIONS_DATA = {"sensitiveThisOrThatQuestions":[...],"sensitiveAllModeQuestions":[...]}
PORT = (leave empty - auto-assigned)
```

### Step 4: Deploy with Full Content
1. Click "Create Web Service" (or "Manual Deploy" if updating existing)
2. Wait for deployment to complete
3. Check logs for: 
   ```
   [gameUtils] Loaded 56 ultra-sensitive questions from env
   [gameUtils] Loaded 189 sensitive questions from env (rating 7+)
   ```

### Step 5: Verify Full Deployment
Your app will work with:
- ✅ All core functionality
- ✅ General audience questions (rating 1-6)
- ✅ Enhanced content questions (rating 7-10)
- ✅ PIN-protected exclusive mode (rating 11)

---

## Quick Migration: Safe → Full

**If you already have a safe deployment and want to add enhanced content:**

### Method 1: Environment Variable Update (Easiest)
1. Run `node generate-env-data.js` locally
2. Go to Render Dashboard → Your Service → Environment
3. Add new environment variable:
   - **Key**: `SENSITIVE_QUESTIONS_DATA`
   - **Value**: Paste the JSON output
4. Click "Save Changes" - Service will auto-redeploy

### Method 2: Manual File Upload (Alternative)
1. Go to Render Dashboard → Your Service → Shell
2. Navigate to `/opt/render/project/src/dist/src/`
3. Create `sensitiveQuestions.js` file manually
4. Restart the service

---

## Quick Migration: Full → Safe

**To remove enhanced content and make deployment public-safe:**

1. Go to Render Dashboard → Your Service → Environment
2. **Delete** the `SENSITIVE_QUESTIONS_DATA` environment variable
3. Click "Save Changes" - Service will auto-redeploy
4. Verify logs show: `"Sensitive questions file not found - adult content modes will be disabled"`

---

## Troubleshooting

### Common Issues

#### Issue: Service Won't Start
**Solution**: Check build logs for TypeScript compilation errors
```bash
# Local test:
cd server
npm run build
npm start
```

#### Issue: Frontend Can't Connect
**Solution**: Verify CORS configuration
1. Check `VITE_SOCKET_URL` environment variable
2. Ensure it matches your Vercel frontend URL exactly
3. Check for trailing slashes or protocol mismatches

#### Issue: Enhanced Content Not Loading
**Solution**: Verify environment variable
1. Check Render logs for loading messages
2. Ensure `SENSITIVE_QUESTIONS_DATA` is properly formatted JSON
3. Re-run `generate-env-data.js` if needed

#### Issue: Questions Missing in Game
**Solution**: Check question filtering logic
```javascript
// Expected log messages:
"[gameUtils] Loaded X ultra-sensitive questions from env"
"[gameUtils] Loaded Y sensitive questions from env (rating 7+)"
```

### Log Messages to Look For

#### Safe Mode Success:
```
Server is running on http://localhost:3001
[gameUtils] Sensitive questions file not found - adult content modes will be disabled
```

#### Full Mode Success:
```
Server is running on http://localhost:3001
[gameUtils] Loaded 56 ultra-sensitive questions from env
[gameUtils] Loaded 189 sensitive questions from env (rating 7+)
```

---

## Security Best Practices

### For Full Mode Deployment:
1. **Use private repositories** when possible
2. **Limit Render service access** to necessary team members
3. **Monitor environment variables** - don't expose in logs
4. **Regular security reviews** of content classification
5. **Consider database migration** for production at scale

### For Public Deployments:
1. **Always use Safe Mode** for public portfolios
2. **Verify no sensitive content** in repository
3. **Test GitHub search** for your repository name + sensitive keywords
4. **Document professional use cases** in README

---

## Future Scaling Options

### Database Migration (Recommended for Production)
Instead of environment variables, consider:
1. **MongoDB/PostgreSQL**: Store questions in database
2. **Redis**: Cache frequently accessed content
3. **Admin Interface**: Manage content without code changes
4. **Content CDN**: Serve content from secure endpoints

### Advanced Content Management
1. **User-based permissions**: Different content for different user types
2. **Dynamic content loading**: Load content based on user verification
3. **A/B testing**: Serve different content sets for testing
4. **Analytics integration**: Track content engagement and safety

---

## Quick Reference Commands

```bash
# Generate environment data for full deployment
cd server && node generate-env-data.js

# Test local build
cd server && npm run build && npm start

# Check environment variables on Render
# (Use Render Dashboard → Service → Environment)

# Quick health check
curl https://your-render-service.onrender.com/health

# View deployment logs
# (Use Render Dashboard → Service → Logs)
```

---

## Deployment Checklist

### Before Deploying:
- [ ] `.gitignore` includes `server/src/sensitiveQuestions.ts`
- [ ] Local `sensitiveQuestions.ts` file exists (for full mode)
- [ ] Vercel frontend URL is ready
- [ ] Choose deployment mode (Safe vs Full)

### Safe Mode Deployment:
- [ ] Render service created with correct settings
- [ ] `VITE_SOCKET_URL` environment variable set
- [ ] Deployment successful
- [ ] Logs show "adult content modes will be disabled"
- [ ] Frontend can connect to backend

### Full Mode Deployment:
- [ ] Environment data generated locally
- [ ] `SENSITIVE_QUESTIONS_DATA` environment variable set
- [ ] Deployment successful
- [ ] Logs show both question sets loaded from env
- [ ] All content modes working (test PIN: "1234")

### Post-Deployment:
- [ ] Health endpoint responds: `/health`
- [ ] Frontend-backend communication working
- [ ] Game creation and joining functional
- [ ] Content appropriate for deployment type
- [ ] Security measures in place (for full mode) 