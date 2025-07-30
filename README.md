# 🏨 HotelManagementApp – Application de gestion d'hôtel

**HotelManagementApp** est une solution moderne et complète permettant de gérer efficacement un hôtel, ses utilisateurs, ses chambres et ses réservations. Conçue avec les technologies les plus fiables du marché, cette application est prête à être déployée en un clic grâce à Docker.

## ✨ Fonctionnalités principales

- 🔐 Authentification sécurisée avec JSON Web Token (JWT)
- 👥 Gestion des utilisateurs avec rôles (ADMIN, STAFF, etc.)
- 🛏️ Gestion des chambres, des réservations et de leur disponibilité
- 📊 Tableau de bord moderne et responsive (frontend Angular)
- 🗄️ Backend Java Spring Boot robuste
- 💾 Base de données MySQL intégrée
- 🐳 Déploiement rapide avec Docker et Docker Compose

## 🚀 Lancement rapide

> Copiez-collez la commande ci-dessous dans un terminal sur **n'importe quelle machine équipée de Docker** pour cloner, construire et démarrer l'application automatiquement :
### 🪟 Pour Windows (CMD)

```cmd
(for %P in (3306 8080 4200) do @for /f "tokens=1" %I in ('docker ps --format "{{.ID}} {{.Ports}}" ^| findstr ":%P"') do docker rm -f %I) & git clone https://github.com/BDSDM/hotelManagementApp-Dockerise.git && cd hotelManagementApp-Dockerise && docker-compose build && docker-compose up -d
```

### 🪟 Pour Linux (bash)

```bash
for P in 3306 8080 4200; do docker ps --format '{{.ID}} {{.Ports}}' | grep ":$P" | awk '{print $1}' | xargs -r docker rm -f; done && git clone https://github.com/BDSDM/hotelManagementApp-Dockerise.git && cd hotelManagementApp-Dockerise && docker-compose build && docker-compose up -d
```
