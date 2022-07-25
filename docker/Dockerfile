FROM node:8.16.0
COPY ./build /etc/daacs-web
EXPOSE 3000
VOLUME ["/etc/daacs-web/daacs/dist"]
WORKDIR /etc/daacs-web/node
RUN npm install
CMD npm start