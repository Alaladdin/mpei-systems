FROM node:16-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
EXPOSE 9001

CMD [ "npm", "start" ]
