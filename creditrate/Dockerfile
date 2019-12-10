FROM node:11 as node
ADD . /tmp/app
WORKDIR /tmp/app
RUN npm install && npm run build

FROM nginx:alpine
COPY --chown=nginx:nginx --from=node /tmp/app/dist /usr/share/nginx/html/creditrate/
RUN find /usr/share/nginx/html/creditrate/
COPY ./nginx /etc/nginx
