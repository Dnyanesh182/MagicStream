# MagicStream 🎬✨

A full-stack, production-grade movie streaming platform with AI-powered recommendations.

## Architecture

```
Vercel (CDN) → Render/Fly.io (Go API) → MongoDB Atlas (M0)
                      ↕
                  OpenAI (AI Sentiment)
```

| Layer | Tech |
|---|---|
| **Frontend** | React 19, Vite, React Player, Bootstrap |
| **Backend** | Go, gin-gonic, JWT (HttpOnly cookies) |
| **Database** | MongoDB Atlas |
| **AI** | LangChainGo + OpenAI (sentiment classification) |
| **CI/CD** | GitHub Actions → Render deploy hook |

## Features

- 🎥 Movie streaming simulation with React Player
- 🔐 JWT authentication with HttpOnly cookie transport
- 🤖 AI-powered review sentiment analysis (OpenAI)
- 📊 Personalized movie recommendations based on favourite genres
- 👑 Admin role with review management
- 🏥 Health check endpoint for load balancer probes
- 🐳 Multi-stage Dockerfile (~12MB production image)
- 🚀 GitHub Actions CI/CD with smoke testing

## Quick Start (Local Development)

### Prerequisites

- [Go 1.24+](https://go.dev/dl/)
- [Node.js 20+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or Atlas)

### Backend

```bash
cd Server/MagicStreamServer
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secrets, and OpenAI key
go run main.go
```

### Frontend

```bash
cd Client/magic-stream-client
cp .env.example .env
# Edit .env — set VITE_API_BASE_URL=http://localhost:8080
npm install
npm run dev
```

### Seed Database

```bash
export MONGODB_URI="your-mongodb-uri"
export DATABASE_NAME="magicstream"
bash scripts/seed-mongo.sh
```

## Deployment

| Service | Platform | Tier |
|---|---|---|
| Frontend | Vercel | Free |
| Backend | Render / Fly.io | Free |
| Database | MongoDB Atlas | M0 Free |
| CI/CD | GitHub Actions | Free |

See the full [deployment guide](https://github.com/Dnyanesh182/MagicStream/wiki) for step-by-step instructions.

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/health` | ✗ | Health check |
| `GET` | `/movies` | ✗ | List all movies |
| `GET` | `/genres` | ✗ | List all genres |
| `POST` | `/register` | ✗ | Register user |
| `POST` | `/login` | ✗ | Login (sets cookies) |
| `POST` | `/logout` | ✗ | Logout (clears cookies) |
| `POST` | `/refresh` | ✗ | Refresh JWT tokens |
| `GET` | `/movie/:imdb_id` | ✓ | Get single movie |
| `POST` | `/addmovie` | ✓ | Add a movie |
| `GET` | `/recommendedmovies` | ✓ | AI-powered recommendations |
| `PATCH` | `/updatereview/:imdb_id` | ✓ (ADMIN) | Update review + AI ranking |

## Environment Variables

### Backend (`Server/MagicStreamServer/.env`)

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✓ | MongoDB connection string |
| `DATABASE_NAME` | ✓ | Database name (`magicstream`) |
| `SECRET_KEY` | ✓ | JWT signing key |
| `SECRET_REFRESH_KEY` | ✓ | JWT refresh token key |
| `OPENAI_API_KEY` | ✗ | OpenAI API key (graceful fallback if missing) |
| `BASE_PROMPT_TEMPLATE` | ✗ | AI prompt template |
| `ALLOWED_ORIGINS` | ✗ | CORS origins (comma-separated) |
| `PORT` | ✗ | Server port (default: 8080, auto-set by Render) |
| `GIN_MODE` | ✗ | `debug` or `release` |

### Frontend (`Client/magic-stream-client/.env`)

| Variable | Required | Description |
|---|---|---|
| `VITE_API_BASE_URL` | ✓ | Backend API URL |

## License

This project is for educational purposes.
