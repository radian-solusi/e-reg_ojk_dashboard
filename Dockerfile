FROM node:22.14.0-alpine AS build-stage
WORKDIR /app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine AS production-stage
RUN apk update && apk upgrade
COPY --from=build-stage /app/output /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]