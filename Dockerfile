FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]

# Empacotar os assets estáticos com nginx
FROM nginx:1.21.0-alpine

# Copiar os assets do builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Adicionar nginx.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
