# Docker Deployment Guide

This guide explains how to run the AI Academic Advisor using Docker, making it easy for anyone to run the application without worrying about Node.js versions or dependencies.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

## Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AchuabioPALO/AI-Academic-Advisor.git
   cd AI-Academic-Advisor
   ```

2. **Run with Docker Compose** (recommended):
   ```bash
   docker-compose up --build
   ```

3. **Access the application**:
   Open your browser to `http://localhost:3000`

## Docker Commands

### Using Docker Compose (Recommended)
```bash
# Build and run the application
docker-compose up --build

# Run in detached mode (background)
docker-compose up -d --build

# Stop the application
docker-compose down

# View logs
docker-compose logs -f
```

### Using Docker directly
```bash
# Build the image
docker build -t ai-academic-advisor .

# Run the container
docker run -p 3000:3000 ai-academic-advisor

# Run in detached mode
docker run -d -p 3000:3000 --name ai-advisor ai-academic-advisor

# Stop the container
docker stop ai-advisor

# Remove the container
docker rm ai-advisor
```

## Features

The Docker deployment includes:
- ✅ **Optimized production build** - Fast loading times
- ✅ **Multi-stage build** - Smaller final image size
- ✅ **Security best practices** - Non-root user, minimal attack surface
- ✅ **Zero configuration** - All dependencies included
- ✅ **Mock data included** - Works immediately without API keys

## Environment Variables

The application works out-of-the-box with mock data. If you want to enable real AI features, create a `.env.local` file:

```env
OPENAI_API_KEY=your_openai_key_here
AZURE_OPENAI_ENDPOINT=your_azure_endpoint
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
AZURE_OPENAI_API_VERSION=2023-12-01-preview
```

Then uncomment the environment variables in `docker-compose.yml`.

## Demo Features Available

1. **Graduation Risk Assessment** - Test with Bob Smith (high risk) vs Alice Johnson (low risk)
2. **Course Recommendations** - Try Software Engineer career path
3. **Prerequisites Visualization** - Check CS 301 prerequisite chain
4. **Career Progress Tracking** - Monitor Carol Davis → Data Scientist progress
5. **Administrative Interface** - Toggle admin mode for data management

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, modify `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Use port 3001 instead
```

### Container Won't Start
Check the logs:
```bash
docker-compose logs ai-academic-advisor
```

### Memory Issues
If the build fails due to memory constraints, try:
```bash
docker system prune
```

## Development vs Production

- **Development**: Run `npm run dev` for hot reloading
- **Production**: Use Docker for optimized, production-ready deployment

## Benefits of Docker Deployment

1. **Consistent Environment** - Same behavior across all machines
2. **Easy Setup** - No Node.js installation required
3. **Production Ready** - Optimized build with security best practices
4. **Portable** - Runs anywhere Docker is available
5. **Scalable** - Easy to deploy to cloud platforms

## Cloud Deployment

This Docker setup is ready for deployment to:
- **Vercel** - Native Next.js support
- **Railway** - Direct Docker deployment
- **Render** - Docker support
- **AWS/GCP/Azure** - Container services
- **DigitalOcean App Platform** - Docker support

For cloud deployment, the Docker image provides a consistent, reliable deployment package.
