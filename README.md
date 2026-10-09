# Ndeye_Amy_Ciss_TP_Nodejs

## 1. Présentation du projet

**Ndeye_Amy_Ciss_TP_Nodejs** est une application web développée avec **Node.js et Express.js** permettant de gérer les produits d'un petit magasin.

L'application repose sur une API REST connectée à une base de données MySQL. Elle propose une interface utilisateur permettant d'effectuer les principales opérations de gestion des produits : ajout, consultation, modification, recherche et suppression.

Les pages HTML sont générées à l'aide du moteur de templates **EJS**.

## 2. Objectifs du projet

Ce projet a pour objectif de mettre en pratique les notions fondamentales du développement web côté serveur avec Node.js.

Les principaux objectifs sont :

- Créer et configurer un projet Node.js avec npm.
- Développer un serveur web avec Express.js.
- Connecter une application à une base de données MySQL.
- Utiliser EJS pour générer des pages HTML dynamiques.
- Mettre en place les opérations CRUD (Create, Read, Update, Delete).
- Organiser les différentes fonctionnalités à travers une interface simple et intuitive.

## 3. Technologies utilisées

| Technologie | Utilisation                                                 |
| ----------- | ----------------------------------------------------------- |
| Node.js     | Exécution du code JavaScript côté serveur                   |
| Express.js  | Gestion du serveur et des routes HTTP                       |
| MySQL       | Stockage des données des produits                           |
| mysql2      | Connexion et échanges avec la base de données               |
| EJS         | Génération des pages HTML dynamiques                        |
| npm         | Gestion du projet et des dépendances                        |
| Nodemon     | Redémarrage automatique du serveur pendant le développement |

## 4. Fonctionnalités de l'application

### 4.1. Accueil et liste des produits

La page d'accueil affiche les produits enregistrés dans la base de données sous forme de tableau HTML.

Les informations présentées peuvent notamment inclure le nom du produit, son prix et sa quantité, selon les champs définis dans la base de données.

### 4.2. Ajouter un produit

L'utilisateur dispose d'une page permettant de saisir les informations d'un nouveau produit et de l'enregistrer dans la base de données.

### 4.3. Modifier un produit

Chaque produit possède un lien ou un bouton de modification qui redirige vers une page dédiée, `modifier.ejs`.

Cette page permet de consulter les informations existantes du produit, de les modifier et d'enregistrer les changements.

### 4.4. Rechercher un produit

Une page de recherche permet à l'utilisateur de retrouver un produit à partir des critères prévus dans l'application.

### 4.5. Enregistrer et consulter les ventes

L'application propose une fonctionnalité permettant d'enregistrer les ventes réalisées et de consulter la liste des ventes effectuées.

### 4.6. Supprimer les produits en rupture de stock

Un bouton permet de supprimer les produits dont la quantité est égale à zéro.

Cette fonctionnalité facilite le nettoyage de la liste des produits en rupture de stock.

### 4.7. Navigation

Une barre de navigation permet d'accéder rapidement aux principales pages :

- **Accueil :** afficher la liste des produits.
- **Ajouter un produit :** accéder au formulaire d'ajout.
- **Rechercher :** accéder à la fonctionnalité de recherche.

## 5. Structure du projet

L'application est organisée autour d'un fichier serveur principal et d'un dossier contenant les vues EJS.

```text
Ndeye_Amy_Ciss_TP_Nodejs/
│
├── server.js          # Serveur Express et gestion des routes
├── package.json       # Informations et dépendances du projet
├── package-lock.json  # Versions détaillées des dépendances
├── magasin.sql        # Script SQL de création de la base
│
└── views/             # Pages de l'application
    ├── accueil.ejs    # Liste des produits
    ├── ajouter.ejs    # Formulaire d'ajout
    ├── modifier.ejs   # Formulaire de modification
    └── rechercher.ejs # Page de recherche
```

_Remarque : les noms de fichiers présentés sont indicatifs. Ils doivent correspondre aux fichiers réellement présents dans le projet. Les pages de vente peuvent également être ajoutées dans le dossier `views/` si elles existent._

## 6. Base de données

L'application utilise une base de données MySQL nommée `magasin_db`.

Le fichier `magasin.sql` contient le script SQL permettant de préparer la base de données et les tables nécessaires à l'application.

La base de données sert à conserver les informations relatives aux produits et, selon la structure retenue, aux ventes effectuées.

### Importation de la base de données

1. Ouvrir MySQL ou un outil de gestion de base de données comme phpMyAdmin.
2. Créer la base de données `magasin_db`, si elle n'est pas déjà créée par le script.
3. Importer le fichier `magasin.sql`.
4. Vérifier que les tables nécessaires ont bien été créées.

## 7. Installation et configuration

### Prérequis

Avant de lancer le projet, il faut disposer des éléments suivants :

- Node.js installé sur l'ordinateur.
- npm, fourni avec Node.js.
- Un serveur MySQL fonctionnel.
- Un éditeur de code, par exemple Visual Studio Code.

### Étape 1 : récupérer le projet

Ouvrir un terminal dans le dossier du projet.

Si le projet est hébergé sur GitHub, utiliser :

```bash
git clone URL_DU_DEPOT
cd Ndeye_Amy_Ciss_TP_Nodejs
```

Si le projet est déjà présent sur l'ordinateur, ouvrir directement son dossier dans le terminal.

### Étape 2 : installer les dépendances

Exécuter la commande suivante :

```bash
npm install
```

Cette commande installe les dépendances définies dans `package.json`.

Si elles n'ont pas encore été installées, utiliser :

```bash
npm install express mysql2 ejs
npm install --save-dev nodemon
```

### Étape 3 : configurer la base de données

Vérifier dans `server.js` les paramètres de connexion MySQL :

- Hôte du serveur.
- Port MySQL.
- Nom de la base de données.
- Nom d'utilisateur.
- Mot de passe.

Ces paramètres doivent correspondre à la configuration MySQL de l'environnement utilisé.

### Étape 4 : démarrer l'application

Lancer le serveur en mode développement avec :

```bash
npm run dev
```

Cette commande utilise Nodemon pour redémarrer automatiquement le serveur lorsqu'une modification du code est détectée.

## 8. Accès à l'application

Lorsque le serveur est démarré correctement, ouvrir un navigateur web et accéder à l'adresse suivante :

**http://localhost:3000**

La page d'accueil permet de consulter la liste des produits et d'accéder aux différentes fonctionnalités à partir de la barre de navigation.

## 9. Routes de l'application

L'application utilise les routes HTTP d'Express pour gérer les actions de l'utilisateur.

Les routes exactes dépendent de leur définition dans `server.js`. Les opérations principales sont les suivantes :

| Opération                      | Méthode HTTP habituelle | Description                                 |
| ------------------------------ | ----------------------- | ------------------------------------------- |
| Consulter les produits         | GET                     | Récupérer et afficher la liste des produits |
| Afficher le formulaire d'ajout | GET                     | Présenter le formulaire de création         |
| Ajouter un produit             | POST                    | Enregistrer un nouveau produit              |
| Afficher un produit à modifier | GET                     | Charger les informations du produit         |
| Enregistrer une modification   | POST ou PUT             | Mettre à jour les informations              |
| Supprimer un produit           | POST ou DELETE          | Supprimer un produit                        |
| Rechercher un produit          | GET                     | Filtrer les produits selon les critères     |
| Consulter les ventes           | GET                     | Afficher les ventes enregistrées            |

_Les méthodes indiquées sont des exemples courants. Pour documenter précisément l'API, il faut les vérifier dans le fichier `server.js`._

## 10. Organisation du code

Le fichier `server.js` regroupe les principales parties de l'application :

- **Configuration du serveur :** initialisation d'Express et définition du port.
- **Configuration d'EJS :** choix du moteur de templates et du dossier des vues.
- **Connexion MySQL :** configuration de l'accès à la base de données.
- **Routes :** définition des URL et des actions associées.
- **Requêtes SQL :** récupération, insertion, modification et suppression des données.
- **Rendu des vues :** transmission des données aux pages EJS pour générer le HTML.

Les vues du dossier `views/` permettent de séparer la présentation HTML de la logique exécutée côté serveur.

## 11. Lancement du projet en résumé

```bash
# Installer les dépendances
npm install

# Démarrer le serveur en mode développement
npm run dev
```

Ensuite, ouvrir :

http://localhost:3000

## 12. Auteur

**Nom :** Ndeye Amy Ciss

**Projet :** TP Node.js — Gestion des produits d'un magasin

**Type de projet :** Application web de gestion avec Node.js, Express.js, EJS et MySQL.

## 13. Conclusion

Ce projet permet de mettre en pratique les bases du développement d'une application web avec Node.js. Il combine la gestion des routes avec Express.js, l'affichage dynamique avec EJS et la persistance des données avec MySQL.

Il constitue une première étape dans l'apprentissage du développement backend et de la création d'applications web connectées à une base de données.
