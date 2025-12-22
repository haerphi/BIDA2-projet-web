# Gestion de prets de livres entre amis

Cette application permet de gérer les prêts de livres entre amis. Vous pouvez ajouter des livres, enregistrer des prêts et suivre qui a emprunté quel livre.

## Prérequis
- Node.JS (développer sous version 24.10.0)
- base de données PostgreSQL (disponible via un docker-compose dans le dossier `Docker`)

## Installation
- Cloner le dépôt: `git clone https://github.com/haerphi/BIDA2-projet-web.git`
- Aller dans le dossier du projet API: `cd BIDA2-projet-web/loan-book-friend-api`
- Installer les dépendances de l'API: `npm install`
- Configurer la base de données dans le fichier `.env` à la racine du projet (voir `.env.example` pour un exemple)
- Aller dans le dossier Docker: `cd ../Docker`
- Lancer les conteneurs Docker: `docker-compose up -d`
- Aller dans le dossier du projet client: `cd ../loan-book-friend-client`
- Installer les dépendances du client: `npm install`
- (optionel) insérer des données de test dans la base de données en lançant le script SQL `Inserts.sql` au chemin suivant: `Docs/Inserts.sql`.

## Lancement de l'application
Avant de démarrer l'application, assurez-vous d'avoir une base de données PostgreSQL en cours d'exécution et que le fichier `.env` soit correctement configuré.

Pour lancer l'application, il est nécessaire de lancer à la fois le serveur API et le client via deux terminaux séparés.
- Dans le premier terminal, aller dans le dossier de l'API: `cd BIDA2-projet-web/loan-book-friend-api` et lancer le serveur: `npm start`
- Dans le second terminal, aller dans le dossier du client: `cd BIDA2-projet-web/loan-book-friend-client` et lancer le client: `npm start`

L'API sera accessible à l'adresse `http://localhost:3000` et avec sa documentation Swagger à l'adresse `http://localhost:3000/docs`.

Le client sera accessible à l'adresse `http://localhost:4200`.