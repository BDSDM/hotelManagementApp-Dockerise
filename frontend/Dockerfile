# Étape 1 : Build Angular
FROM node:20 AS builder

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json en premier (meilleure gestion du cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source Angular
COPY . .

# Build de l'application avec la bonne configuration
RUN npm run build -- --configuration production

# Étape 2 : Serveur NGINX
FROM nginx:1.25-alpine

# Copier les fichiers Angular compilés dans NGINX
COPY --from=builder /app/dist/hotel-management-frontend /usr/share/nginx/html

# Copier la configuration NGINX personnalisée
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
