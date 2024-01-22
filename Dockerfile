FROM node:14-alpine

WORKDIR /patmccuefullstackrestaurantapplication/

COPY public/ /patmccuefullstackrestaurantapplication/public
COPY src/ /patmccuefullstackrestaurantapplication/src
COPY package.json /patmccuefullstackrestaurantapplication/
COPY pages/ /patmccuefullstackrestaurantapplication/pages
COPY yarn.lock /patmccuefullstackrestaurantapplication/

RUN yarn install

# Build the Next.js app
RUN yarn build

# EXPOSE 8080
EXPOSE 3000

CMD ["yarn", "start"]

