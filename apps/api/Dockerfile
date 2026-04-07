FROM node:20-alpine AS base

# Install pnpm Globally
RUN npm install -g pnpm

# Create Work Directory
WORKDIR /app

# Copy root workspace files
COPY package.json pnpm-workspace.yaml pnpm-locl.yaml ./

# Copy API package 
COPY apps/api ./api/

# Stage 1 - build
FROM base AS builder

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN pnpm --filter=@archiq/api exec prisma generate

# Build the api
RUN pnpm --filter=@archiq/api build

# Stage 2 - run  
FROM base AS runner

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy compiled output from builder
COPY --from=builder /app/api/dist ./api/dist

# Copy generated Prisma client
COPY --from=builder /app/api/src/generated ./api/src/generated

EXPOSE 3000
CMD ["node", "server.js"]