FROM node:20-alpine

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

RUN npm start

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD [ "npm","run","dev" ]