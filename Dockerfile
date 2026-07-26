# Etapa 1: Compilación
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar aplicación Angular
RUN npm run build

# Etapa 2: Servidor
FROM nginx:alpine

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos compilados desde la etapa anterior
COPY --from=builder /app/dist/portal-auth/browser /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
