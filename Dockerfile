FROM node:10.15.3-alpine

RUN mkdir -p /root/app

RUN npm install

WORKDIR /root/app

RUN npm run build

CMD npm start