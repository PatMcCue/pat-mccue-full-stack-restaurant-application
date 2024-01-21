FROM node:18-alpine
WORKDIR /patmccuefullstackrestaurantapplication/

COPY public/ /patmccuefullstackrestaurantapplication/public
COPY src/ /patmccuefullstackrestaurantapplication/src
COPY package.json /patmccuefullstackrestaurantapplication/

RUN npm install

CMD ["npm", "start"]