FROM node:12

WORKDIR /surl
COPY . ./

RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]
