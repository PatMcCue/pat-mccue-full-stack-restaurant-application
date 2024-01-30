FROM node:14-alpine

WORKDIR /patmccuefullstackrestaurantapplication

COPY package*.json ./

COPY . backend

RUN yarn install

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
