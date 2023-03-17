FROM node:18-alpine

RUN mkdir -p /home/node/server && chown -R node:node /home/node/server
WORKDIR /home/node/server

RUN apk update
RUN apk upgrade
RUN apk add bash

COPY --chown=node:node . .
#COPY package*.json ./

USER node

RUN yarn install

EXPOSE 7301
EXPOSE 7302
EXPOSE 7303

CMD ["node", "index.js"]
