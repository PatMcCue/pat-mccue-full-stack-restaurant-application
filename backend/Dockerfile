FROM node:14-alpine

WORKDIR /patmccuefullstackrestaurantapplication

# Copy package.json and package-lock.json or yarn.lock
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the entire backend directory into the container
COPY . /patmccuefullstackrestaurantapplication/backend

# Build the application
RUN yarn build

# Expose port 1337
EXPOSE 1337

# Command to run the application
CMD ["yarn", "start"]
