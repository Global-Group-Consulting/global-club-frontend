FROM node:14.18.0-alpine

RUN apk add --no-cache python3 g++ make

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "serve"]

EXPOSE 3000
