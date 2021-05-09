FROM node:14
WORKDIR /usr/src/app


COPY package*.json ./


ENV PORT=9000
RUN npm install
COPY . .
RUN npm run build


EXPOSE 9000


CMD [ "www" ]
