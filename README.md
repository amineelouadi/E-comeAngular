# Nom du Projet

## Description
Ce projet est une application web E-commerce qui permet aux utilisateurs de naviguer, d'ajouter des produits à leur panier et de gérer leur liste de souhaits. Le backend est simulé avec Node.js, et les données sont stockées dans un fichier `db.json`. L'application utilise Angular pour le frontend, offrant une interface utilisateur réactive et intuitive.

## Fonctionnalités
- **Liste de Souhaits** : Les utilisateurs peuvent ajouter des produits à leur liste de souhaits et les visualiser.
- **Panier** : Les utilisateurs peuvent ajouter des produits à leur panier, mettre à jour les quantités et procéder au paiement.
- **Stockage Local** : Les articles du panier et de la liste de souhaits sont enregistrés dans le stockage local pour une persistance à travers les rafraîchissements de page.
- **Affichage des Produits** : Les produits sont affichés avec leurs images, descriptions, et prix, y compris les prix réduits si disponibles.

## Technologies Utilisées
- **Frontend** : Angular, HTML, CSS, TypeScript
- **Backend** : Node.js (simulé), données provenant de `db.json`

## Installation

### Prérequis
- Node.js (version v21.7.0)
- Angular CLI (version 19.0.7)

### Étapes d'Installation
1. Clonez le dépôt :
   ```bash
   git clone https://github.com/amineelouadi/E-comeAngular.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd E-comeAngular
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```

## Utilisation
1. Pour exécuter le serveur, utilisez :
   ```bash
   npm run server
   ```
2. Pour démarrer le projet, utilisez :
   ```bash
   npm run start
   ```
3. Ouvrez votre navigateur et accédez à `http://localhost:4200` (ou le port approprié si différent).

## Contribuer
1. Forkez le dépôt.
2. Créez une nouvelle branche :
   ```bash
   git checkout -b feature/VotreFonctionnalité
   ```
3. Apportez vos modifications et validez-les :
   ```bash
   git commit -m 'Ajoutez une fonctionnalité'
   ```
4. Poussez vers la branche :
   ```bash
   git push origin feature/VotreFonctionnalité
   ```
5. Ouvrez une demande de tirage.