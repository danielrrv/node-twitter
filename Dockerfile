FROM node:14
WORKDIR /usr/src/app


COPY package*.json ./


ENV PORT=8080
RUN npm install
COPY . .
RUN npm run build


EXPOSE 8080


CMD [ "node","www" ]
