FROM node:10.15.3-alpine

RUN mkdir -p /root/app

WORKDIR /root/app

RUN npm install

COPY ./ /root/app

RUN npm run build

CMD npm start