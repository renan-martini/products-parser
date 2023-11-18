FROM node:18.16-alpine

WORKDIR /app

RUN npm install -g @nestjs/cli

RUN apk update && apk add curl

COPY . /app

RUN npm install