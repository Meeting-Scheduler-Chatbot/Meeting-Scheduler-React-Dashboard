#  Dockerfile for Node Express Backend api (development)

FROM node:14.15.4-alpine3.10

# ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package.json ./
#    package*.json ./

RUN npm install 
#   npm ci

# Copy app source code
COPY . .

# Exports
EXPOSE 8080

CMD ["npm","start"]