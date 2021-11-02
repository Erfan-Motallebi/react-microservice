FROM node:16-alpine3.11

WORKDIR /usr/app/query

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "run", "dev" ]