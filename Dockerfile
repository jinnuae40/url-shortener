FROM node:12

WORKDIR /surl
COPY . ./

RUN npm install

ENV MONGO_HOST=asgard-mongo-master01.dakao.io:27017
ENV REDIS_HOST=infra-thirdeye-devredis01.dakao.io
ENV REDIS_PORT=6379
ENV PORT=8080


EXPOSE 80
CMD [ "npm", "start" ]
