# 🚀 Complete Setup Guide - Instagram Video Downloader

Complete guide to set up and run the full Instagram Video Downloader application with Next.js frontend and Python Flask backend.

## 📦 What You Have

```
instagram-video-downloader/
│
├── 📁 nextjs-frontend/          # Frontend (Next.js + React)
│   ├── pages/                   # React pages
│   ├── styles/                  # CSS styles
│   ├── public/                  # Static files
│   └── package.json             # Node.js dependencies
│
└── 📁 python-backend/           # Backend API (Flask + Python)
    ├── app.py                   # Main Flask app
    ├── requirements.txt         # Python dependencies
    └── Dockerfile               # Docker config
```

## 🎯 Quick Start Guide

### Prerequisites

**For Development:**
- Python 3.8+ installed
- Node.js 18+ installed
- npm or yarn

**For Docker:**
- Docker Desktop installed
- Docker Compose installed

### Option 1: Run with Docker 🐳 (Easiest)

1. **Create docker-compose.yml in root directory:**

```yaml
version: '3.8'

services:
  # Python Backend
  backend:
    build: ./python-backend
    container_name: instagram-backend
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - DEBUG=False
    restart: unless-stopped
    networks:
      - app-network

  # Next.js Frontend
  frontend:
    build:
      context: ./nextjs-frontend
      dockerfile: Dockerfile
    container_name: instagram-frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:5000
    depends_on:
      - backend
    restart: unless-stopped
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

2. **Create Dockerfile for frontend:**

```dockerfile
# nextjs-frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

3. **Build and run:**

```bash
docker-compose build
docker-compose up -d
```

4. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

### Option 2: Run Separately 🔧 (Development)

This is best for development with hot-reloading.

#### Step 1: Start Python Backend

**Terminal 1 (Backend):**

```bash
cd python-backend

# Create virtual environment
python -m venv venv

# Activate it
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

✅ Backend running at: http://localhost:5000

#### Step 2: Start Next.js Frontend

**Terminal 2 (Frontend):**

```bash
cd nextjs-frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

✅ Frontend running at: http://localhost:3000

## 🧪 Testing the Setup

### 1. Test Backend

```bash
# Health check
curl http://localhost:5000/api/health

# Should return:
# {"status": "OK", "message": "Instagram Video Downloader API is running"}
```

### 2. Test Frontend

Open browser: http://localhost:3000

You should see the Instagram downloader interface.

### 3. Test Full Integration

1. Go to http://localhost:3000
2. Paste an Instagram URL (e.g., https://www.instagram.com/p/ABC123/)
3. Click "Download"
4. You should see the video preview and download button

## 🔗 Connection Architecture

```
┌─────────────────────────────────────┐
│  User Browser (localhost:3000)      │
│  Next.js Frontend                   │
└──────────────┬──────────────────────┘
               │
               │ HTTP Request
               │ POST /api/download
               │
┌──────────────▼──────────────────────┐
│  Flask Backend (localhost:5000)     │
│  Python API                         │
└──────────────┬──────────────────────┘
               │
               │ External Request
               │
┌──────────────▼──────────────────────┐
│  Instagram Servers                  │
│  Video Content                      │
└─────────────────────────────────────┘
```

## ⚙️ Configuration

### Backend Configuration

**File:** `python-backend/.env`

```env
PORT=5000
DEBUG=False
FLASK_ENV=production
```

### Frontend Configuration

**File:** `nextjs-frontend/.env.local`

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# Site URL (for SEO)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Port 5000 already in use

```bash
# Find process
lsof -i :5000

# Kill it
kill -9 <PID>
```

**Problem:** Module not found

```bash
cd python-backend
source venv/bin/activate
pip install -r requirements.txt
```

**Problem:** CORS errors

Make sure Flask-CORS is installed:
```python
# app.py should have:
from flask_cors import CORS
CORS(app)
```

### Frontend Issues

**Problem:** Port 3000 already in use

```bash
# Kill process
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

**Problem:** Cannot connect to backend

1. Check backend is running:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. Check `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. Restart frontend:
   ```bash
   npm run dev
   ```

**Problem:** Module not found

```bash
cd nextjs-frontend
rm -rf node_modules .next
npm install
npm run dev
```

### Docker Issues

**Problem:** Containers won't start

```bash
# Stop and remove everything
docker-compose down -v

# Rebuild without cache
docker-compose build --no-cache

# Start again
docker-compose up -d
```

**Problem:** Cannot connect between containers

Make sure both services are on the same network in `docker-compose.yml`.

## 🚀 Deployment Guide

### Deploy Backend (Python)

#### Option 1: Heroku

```bash
cd python-backend

# Create Procfile
echo "web: gunicorn app:app" > Procfile

# Deploy
heroku create your-backend-name
git push heroku main
```

#### Option 2: DigitalOcean / VPS

```bash
# SSH to server
ssh root@your-server-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Clone and run
git clone your-repo
cd python-backend
docker-compose up -d
```

### Deploy Frontend (Next.js)

#### Option 1: Vercel (Recommended)

```bash
cd nextjs-frontend

# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel:
```
NEXT_PUBLIC_API_URL=https://your-backend.herokuapp.com
NEXT_PUBLIC_SITE_URL=https://your-frontend.vercel.app
```

#### Option 2: Netlify

```bash
# Build
npm run build

# Deploy via Netlify CLI or dashboard
```

#### Option 3: Self-hosted

```bash
# Build
npm run build

# Start with PM2
npm install -g pm2
pm2 start npm --name "instagram-frontend" -- start
```

## 🔒 Production Checklist

### Security

- [ ] Change DEBUG to False in backend
- [ ] Set strong SECRET_KEY
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Implement CAPTCHA
- [ ] Add input validation
- [ ] Use environment variables

### Performance

- [ ] Enable caching
- [ ] Optimize images
- [ ] Minify assets
- [ ] Enable gzip compression
- [ ] Use CDN for static files
- [ ] Add monitoring

### SEO

- [ ] Update sitemap.xml with real domain
- [ ] Update robots.txt
- [ ] Add Google Analytics
- [ ] Add meta descriptions
- [ ] Submit to search engines
- [ ] Add schema markup

## 📊 Monitoring

### Backend Monitoring

```python
# Add to app.py
import logging

logging.basicConfig(
    filename='app.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
```

### Frontend Monitoring

```bash
# Add Vercel Analytics
npm install @vercel/analytics

# In pages/_app.tsx
import { Analytics } from '@vercel/analytics/react'
<Analytics />
```

## 🛠️ Development Tips

### Running Both Services

**Use 2 terminals:**
```bash
# Terminal 1
cd python-backend && python app.py

# Terminal 2
cd nextjs-frontend && npm run dev
```

**Or use tmux/screen for one terminal:**
```bash
# Create session
tmux new -s dev

# Split window
Ctrl+B then "

# Navigate between panes
Ctrl+B then arrow keys
```

### Hot Reloading

Both services support hot reloading:
- **Backend**: Flask auto-reloads in debug mode
- **Frontend**: Next.js Fast Refresh

### Debugging

**Backend:**
```python
# Add breakpoints
import pdb; pdb.set_trace()

# Or use print statements
print(f"URL: {url}")
```

**Frontend:**
```typescript
// Use console.log
console.log('API Response:', data)

// React DevTools
// Install browser extension
```

## 📝 Common Commands Reference

### Backend Commands

```bash
# Development
python app.py

# Production
gunicorn --bind 0.0.0.0:5000 --workers 4 app:app

# Docker
docker-compose up -d
docker-compose logs -f backend
docker-compose restart backend
docker-compose down
```

### Frontend Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run lint

# Docker
docker-compose up -d
docker-compose logs -f frontend
docker-compose restart frontend
```

### Full Stack Commands

```bash
# Start everything
docker-compose up -d

# Stop everything
docker-compose down

# Rebuild everything
docker-compose up -d --build

# View all logs
docker-compose logs -f

# Restart all
docker-compose restart
```

## 🎓 Learning Resources

### Next.js
- [Official Docs](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### Flask
- [Official Docs](https://flask.palletsprojects.com/)
- [Flask Tutorial](https://flask.palletsprojects.com/tutorial/)

### Docker
- [Docker Docs](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## 🆘 Getting Help

1. **Check Logs**
   ```bash
   # Backend
   docker-compose logs -f backend
   
   # Frontend
   docker-compose logs -f frontend
   ```

2. **Test Individually**
   - Test backend: `curl http://localhost:5000/api/health`
   - Test frontend: Open http://localhost:3000

3. **Common Issues**
   - Port conflicts → Change ports
   - Module errors → Reinstall dependencies
   - Connection errors → Check CORS and URLs

## ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can access both services
- [ ] API connection working
- [ ] Can download test video
- [ ] No errors in console
- [ ] Production ready

## 🎉 You're All Set!

Your Instagram Video Downloader is ready to use!

**Next Steps:**
1. ✅ Test with real Instagram URLs
2. 🎨 Customize the design
3. 📊 Add analytics
4. 🚀 Deploy to production
5. 🔒 Add security features

---

**Made with ❤️ - Happy Coding! 🚀**
