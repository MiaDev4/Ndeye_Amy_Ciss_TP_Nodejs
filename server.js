const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@MA@04",
    database: "magasin_db"
});

db.connect((err) => {
    if (err) {
        console.log("Erreur de connexion à MySQL :");
    } else {
        console.log("Connexion réussie à la base de données !");
    }
});

//Affichage de la liste des produits
app.get("/produits", (req, res) => {
    db.query("SELECT * FROM produits", (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL");
        res.render("index.ejs", { produits: result });
    });
});
//Fin affichage de la liste des produits

//Ajout d'un produit

app.get("/ajouter", (req, res) => {
  res.render("ajouter", { erreur: null, data: {} });
});

app.post("/produits", (req, res) => {
    const { nom, prix, quantite, categorie } = req.body;

    if (!nom || prix === undefined || quantite === undefined || !categorie) {
        return res.status(400).render( "ajouter", { erreur: "Tous les champs sont obligatoires.", data: req.body });
    }

    if (prix <= 0 && quantite < 0) {
        return res.status(400).render("ajouter", { erreur: "Le prix doit être > 0 et la quantité ne peut pas être négative.", data: req.body });
    }
    if (prix <= 0) {
        return res.status(400).render("ajouter", { erreur: "Le prix doit être > 0", data: req.body });
    }

    if (quantite < 0) {
        return res.status(400).render("ajouter", { erreur: "La quantité ne peut pas être négative.", data: req.body });
    }

    const sql = "INSERT INTO produits (nom, prix, quantite, categorie) VALUES (?, ?, ?, ?)";

    db.query(sql, [nom, prix, quantite, categorie], (err, result) => {
        if (err) return res.status(500).send("Erreur SQL" );

        res.redirect("/produits");});
});
//Fin ajout d'un produit

//Recherche de produits
app.get("/recherche", (req, res) => {
    let { categorie, prix_min, prix_max, en_stock } = req.query;

    let sql = "SELECT * FROM produits WHERE 1=1";
    let params = [];

    if (categorie) {
        sql += " AND categorie = ?";
        params.push(categorie);
    }

    if (prix_min) {
        sql += " AND prix >= ?";
        params.push(prix_min);
    }

    if (prix_max) {
        sql += " AND prix <= ?";
        params.push(prix_max);
    }

    if (en_stock === "true") {
        sql += " AND quantite > 0";
        
    }

    db.query(sql, params, (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL" );
        res.render("recherche", { produit: result , query: req.query });
});
});
//Fin recherche de produits

//Modification d'un produit
app.get("/modifier/:id", (req, res) => {
  db.query(
    "SELECT * FROM produits WHERE id = ?",
    [req.params.id],
    (err, rows) => {
      if (rows.length === 0) return res.status(404).send("Produit introuvable");
      res.render("modifier", { produit: rows[0], erreur: null });
    }
  );
});

app.post("/produits/:id/modifier", (req, res) => {
    const { nom, prix, quantite, categorie } = req.body;

    if (!nom || prix === undefined || quantite === undefined || !categorie) {
        return res.status(400).render("modifier", { erreur: "Tous les champs sont obligatoires.", produit:{...req.body, id:req.params.id} });
    }
    if (prix <= 0 && quantite < 0) {
        return res.status(400).render("modifier", { erreur: "Le prix doit être > 0 et la quantité ne peut pas être négative.", produit:{...req.body,id: req.params.id} });
    }
    if (prix <= 0) {
        return res.status(400).render("modifier", { erreur: "Le prix doit être > 0", produit:{...req.body,id: req.params.id} });
    }
    if (quantite < 0) {
        return res.status(400).render("modifier", { erreur: "La quantité ne peut pas être négative.", produit:{...req.body,id: req.params.id} });
    }   

    const sql = `UPDATE produits SET 
        nom=?,
        prix=?,
        quantite=?,
        categorie=?
        WHERE id=?`;

    db.query(sql, [nom, prix, quantite, categorie, req.params.id], (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL" );

      res.redirect("/produits");
    });
});
//Fin modification d'un produit

//Suppression d'un produit

app.post("/produits/:id/supprimer", (req, res) => {
    const id = req.params.id;

    db.query("SELECT quantite FROM produits WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL" );

        if (result.length === 0)
            return res.status(404).send( "Produit non trouvé" );

        if (result[0].quantite > 0)
            return res.status(400).render("supprimer", { produit: result[0] });

        db.query("DELETE FROM produits WHERE id=?", [id], (err2, resultat) => {
            if (err2) return res.status(500).send( "Erreur SQL" );

            res.redirect("/produits");});
    });
});
//Fin suppression d'un produit

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});