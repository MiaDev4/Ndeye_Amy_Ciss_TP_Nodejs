# Ndeye_Amy_Ciss_TP_Nodejs

Ceci est une API REST pour gérer les produits d'un petit magasin.
L'application permettra d'ajouter, consulter, modifier et supprimer des produits via une interface utilisatuer.

 Tout le code est écrit dans un seul fichier server.js et les vues dans un dossier views/.
 
J'ai eu à :
 - Créer un projet Node.js avec npm init -y.
 - Installer les dépendances : express, mysql2, nodemon.
 - Configurer le script dev dans package.json pour lancer nodemon.
 - Configurer EJS comme moteur de template.
 - Créer une base de données magasin_db(pour sauvegarder mes donnéés) dans magasin.sql.
 - Le serveur écoute sur le port 3000.
 - Afficher un tableau HTML avec tous les produits.
 - Bouton pour la modification (lien vers modifier.ejs).
 - Bouton pour supprimer les produits de quantité 0.
 - Inclure une barre de navigation avec liens vers : 
     . Accueil (liste des produits)
     . Ajouter un produit
     . Rechercher
