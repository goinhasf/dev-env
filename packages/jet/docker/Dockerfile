FROM node:16 as build
WORKDIR /app
COPY ../package*.json .
RUN npm i
COPY ../ .

FROM build as intermediate
RUN npm run build

EXPOSE ${PORT:-80}

ENTRYPOINT [ "node", "build/app.js" ]