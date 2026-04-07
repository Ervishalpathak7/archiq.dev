FROM node:20-alpine AS base
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api ./apps/api

FROM base AS builder
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN pnpm install --frozen-lockfile
RUN pnpm --filter=@archiq/api exec prisma generate
RUN pnpm --filter=@archiq/api build

# fresh image, no source files
FROM node:20-alpine AS runner
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/src/generated ./apps/api/src/generated

EXPOSE 3000
CMD ["node", "apps/api/dist/index.js"]