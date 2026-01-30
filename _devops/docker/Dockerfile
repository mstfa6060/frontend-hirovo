# Build-only Dockerfile for Hirovo Static Next.js App
# Outputs static files to /app/out directory

FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build arguments for environment (optional)
ARG NEXT_PUBLIC_ENVIRONMENT
ARG NEXT_PUBLIC_API_URL

# Convert ARG to ENV so Next.js can access them during build
ENV NEXT_PUBLIC_ENVIRONMENT=${NEXT_PUBLIC_ENVIRONMENT}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build Next.js static export
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Output is in /app/out directory
# Use: docker cp <container>:/app/out ./out
