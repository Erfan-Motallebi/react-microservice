FROM node:16-alpine3.11

WORKDIR /usr/app/post

COPY ./package.json ./

RUN npm install

COPY ./ ./

CMD [ "npm", "run", "dev" ]
