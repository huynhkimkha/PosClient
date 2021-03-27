# stage 1 as builder
FROM node:12-alpine as NPM_BUILD

ARG ENV_TYPE
# prod|dev|staging

WORKDIR /usr/src/app

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install

RUN npx ngcc --properties es2015 --create-ivy-entry-points

COPY . .

# Build the project and copy the files
RUN npm run build:${ENV_TYPE}

# Stage 2
FROM nginx:alpine as FINAL

COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /var/www/vlxdapp/*

# Copy from the stage 1
COPY --from=NPM_BUILD /usr/src/app/dist/bm-client-agency /var/www/vlxdapp

EXPOSE 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]
