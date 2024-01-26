FROM node:14-alpine

WORKDIR /patmccuefullstackrestaurantapplication/

COPY package*.json ./

RUN npm install

RUN yarn build

COPY . .

EXPOSE 1337

CMD ["yarn", "start"]
