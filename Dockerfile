FROM node:14.18.0-alpine

RUN apk add --no-cache python3 g++ make
RUN npm install -g @ionic/cli@6.20.9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "serve"]

EXPOSE 3000
