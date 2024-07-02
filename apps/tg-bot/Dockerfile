FROM --platform=linux/amd64 node:lts-buster-slim AS base

FROM base AS builder
WORKDIR /app
RUN npm i -g turbo

COPY . .
RUN turbo prune tg-bot --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm i

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY .prettierrc .prettierrc
COPY .prettierignore .prettierignore
COPY turbo.json turbo.json

RUN npx turbo build --filter=tg-bot

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 tgbot
RUN adduser --system --uid 1001 tgbot
USER tgbot

COPY --from=installer /app .

CMD ["node", "apps/tg-bot/dist/index.js"]
