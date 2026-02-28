# Usamos una imagen ligera de Node
FROM node:20-alpine
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Exponer el puerto de Next.js
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]