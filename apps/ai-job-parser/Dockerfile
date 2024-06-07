FROM --platform=linux/amd64 node:lts-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g typescript

RUN tsc

CMD ["node", "dist/index.js"]
