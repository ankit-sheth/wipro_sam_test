# DOCKER-VERSION
# Assume ubuntu
FROM node:12

# mark it for easy inspection in docker
LABEL WAT=wipro_ankit_test

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# put whatever port required for container, should be used with alb incase of microservices
EXPOSE 3000 

CMD ["node", "server.js"]
