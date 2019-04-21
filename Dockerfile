FROM node:10.15.3-alpine

RUN mkdir -p /var/www/html/
RUN npm install
WORKDIR /var/www/html

RUN npm run build

CMD npm start