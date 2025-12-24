FROM node:lts
WORKDIR /usr/app

ENV TZ="Europe/Moscow"

RUN npm install -g bun

COPY package.json bun.lock ./
RUN bun install

ENV NODE_ENV=production

COPY next.config.ts postcss.config.mjs tsconfig.json ./
COPY ./public ./public
COPY ./src ./src
COPY ./.env ./

RUN npm run build

CMD ["npm", "run", "start"]