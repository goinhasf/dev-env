FROM node:16 as build
WORKDIR /app
COPY package*.json .
RUN npm i
COPY . .

FROM build as intermediate
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/infra/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]