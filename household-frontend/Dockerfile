FROM node:lts as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --prod

FROM nginx:mainline-alpine
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/household-frontend/* /var/www/
