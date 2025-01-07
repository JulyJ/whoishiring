FROM --platform=linux/amd64  node:lts-buster-slim AS base

FROM base AS builder
WORKDIR /app
RUN npm i -g turbo

COPY . .
RUN turbo prune web-app-react --docker

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

ARG VITE_JOBS_API_URL
ENV VITE_JOBS_API_URL=$VITE_JOBS_API_URL
ENV NODE_ENV=production

RUN npx turbo build --filter=web-app-react

FROM --platform=linux/amd64 nginx:alpine AS prod-runner

COPY --from=installer /app/apps/web-app-react/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
