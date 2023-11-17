FROM node:18-alpine

# Install PM2
RUN npm install -g pm2

# Set working directory
RUN mkdir -p /var/www/products-parser
WORKDIR /var/www/products-parser

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/products-parser/node_modules/.bin:$PATH
# create user with no password
RUN adduser --disabled-password demo

# Copy existing application directory contents
COPY . /var/www/products-parser
# install and cache app dependencies
COPY package.json /var/www/products-parser/package.json
COPY package-lock.json /var/www/products-parser/package-lock.json

# grant a permission to the application
RUN chown -R demo:demo /var/www/products-parser
USER demo

# clear application caching
RUN npm cache clean --force
# install all dependencies
RUN npm install

EXPOSE 3002
# start run in production environment
#CMD [ "npm", "run", "pm2:delete" ]
#CMD [ "npm", "run", "build-docker:dev" ]

# start run in development environment
CMD [ "npm", "run", "start:dev" ]