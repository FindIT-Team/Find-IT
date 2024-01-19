FROM node:latest AS BASE
WORKDIR /app

COPY ./package*.json ./
COPY package*.json ./

RUN npm install

RUN npx next telemetry disable

COPY . .

FROM base AS start

ENTRYPOINT [ "npm", "run", "start" ]

FROM base AS dev

ENTRYPOINT [ "npm", "run", "dev" ]