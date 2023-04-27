FROM node:16 as build
WORKDIR /app
COPY package*.json .
COPY run.sh .
RUN npm i
COPY . .

FROM build as intermediate
RUN npm run build

EXPOSE ${PORT:-80}

ENTRYPOINT [ "sh", "/app/run.sh" ]