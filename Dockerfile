FROM node:14
WORKDIR /app
COPY ./package.json .
RUN npm install npm --global
RUN npm install --only=prod