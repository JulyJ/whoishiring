FROM --platform=linux/amd64 mcr.microsoft.com/playwright:v1.44.1-jammy AS base

FROM base AS builder
WORKDIR /app
RUN npm i -g turbo

COPY . .
RUN turbo prune hn-parser --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm i
RUN npx playwright install --with-deps

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npx turbo build --filter=hn-parser

FROM base AS runner
WORKDIR /app

COPY --from=installer /app .

WORKDIR /app/apps/hn-parser

RUN ["chmod", "+x", "./run-parser.sh"]

CMD ["/bin/bash", "-c", "./run-parser.sh greenhouse-parser && ./run-parser.sh hn-parser"]
