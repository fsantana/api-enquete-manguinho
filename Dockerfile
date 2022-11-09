FROM node:14
WORKDIR /app
RUN npm install tsc npm --global
RUN npm install