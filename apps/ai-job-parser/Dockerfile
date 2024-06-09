FROM --platform=linux/amd64 node:lts-buster-slim AS base

FROM base AS builder
WORKDIR /app
RUN npm i -g turbo

COPY . .
RUN turbo prune ai-job-parser --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm i

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npx turbo build --filter=ai-job-parser

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 aijobparser
RUN adduser --system --uid 1001 aijobparser
USER aijobparser

COPY --from=installer /app .

CMD ["node", "apps/ai-job-parser/dist/index.js"]
