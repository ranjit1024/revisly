## Revisly
Revisly is a modern revision and study platform that transforms notes into interactive quizzes, flashcards, and PDF summaries. Built for students who want efficient, data-driven learning with real-time progress tracking.

✨ Features
Smart PDF Generation - Convert notes to downloadable PDFs stored in AWS S3

Interactive Quizzes - Auto-generated from your study material

Progress Dashboard - Track streaks, mastery levels, and session improvements

Minimalist UI - Fast-loading dashboard with Tailwind + React

Real-time Analytics - "Improved since last session" metrics

## 🛠 Tech Stack

**Frontend:** React + TypeScript + Tailwind CSS

**Backend:** Node.js + Express + Prisma + PostgreSQL

**Real-time:** Redis (queues + caching)

**Storage:** AWS S3 (PDFs)

**Infra:** Docker + AWS EC2/RDS + Vercel


## 🔧 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

Database
`DATABASE_URL="postgresql://username:password@localhost:5432/revisly?schema=public`

Redis
`REDIS_URL="redis://localhost:6379`

`AWS S3 (PDF Storage)
AWS_ACCESS_KEY_ID="your_aws_access_key"
AWS_SECRET_ACCESS_KEY="your_aws_secret_key"
AWS_S3_BUCKET="revisly-pdfs"
AWS_REGION="ap-south-1`

JWT Auth
`JWT_SECRET="your-super-secret-jwt-key-min-32-chars`

App
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

🎯 Quick Start

# Clone & Install
git clone <your-repo>
cd revisly
npm install

# Environment Setup
cp .env.example .env
# Configure AWS S3, PostgreSQL, Redis

# Development
npm run dev

# Build & Deploy
npm run build
docker build -t revisly .

📱 Live Demo 
🔗 https://www.revisly.in/

🚀 Deployment
✅ Dockerized & Production Ready
✅ AWS: EC2 + RDS + S3
✅ CI/CD with GitHub Actions
✅ Vercel for Frontend

📈 Progress Metrics Shown
Study streak growth

**Topics mastered**

**Quiz performance trends**

**Retention rate improvements**