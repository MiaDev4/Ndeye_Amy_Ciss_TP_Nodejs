const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

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

app.post("/produits", (req, res) => {
    const { nom, prix, quantite, categorie } = req.body;

    if (!nom || prix === undefined || quantite === undefined || !categorie) {
        return res.status(400).send( "Tous les champs sont obligatoires." );
    }

    if (prix <= 0) {
        return res.status(400).send( "Le prix doit être > 0" );
    }

    if (quantite < 0) {
        return res.status(400).send( "La quantité ne peut pas être négative." );
    }

    const sql = "INSERT INTO produits (nom, prix, quantite, categorie) VALUES (?, ?, ?, ?)";

    db.query(sql, [nom, prix, quantite, categorie], (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL" );

        res.json( "Produit ajouté avec succès");
    });
});

app.get("/produits", (req, res) => {
    db.query("SELECT * FROM produits", (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL");
        res.json(result);
    });
});

app.get("/produits/recherche", (req, res) => {
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
        res.json(result);
    });
});

app.get("/produits/:id", (req, res) => {
    const sql = "SELECT * FROM produits WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL" );

        if (result.length === 0) {
            return res.status(404).send( "Produit non trouvé" );
        }

        res.json(result[0]);
    });
});


app.put("/produits/:id", (req, res) => {
    const { nom, prix, quantite, categorie } = req.body;

    if (!nom || prix === undefined || quantite === undefined || !categorie) {
        return res.status(400).send( "Tous les champs sont obligatoires." );
    }

    const sql = `UPDATE produits SET 
        nom=?,
        prix=?,
        quantite=?,
        categorie=?
        WHERE id=?`;

    db.query(sql, [nom, prix, quantite, categorie, req.params.id], (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL" );

        if (result.affectedRows === 0) {
            return res.status(404).send("Produit non trouvé" );
        }

        res.send("Produit modifié avec succès" );
    });
});

app.delete("/produits/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT quantite FROM produits WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).send( "Erreur SQL" );

        if (result.length === 0)
            return res.status(404).send( "Produit non trouvé" );

        if (result[0].quantite > 0)
            return res.status(400).send( "Suppression interdite quantité est supérieure à 0" );

        db.query("DELETE FROM produits WHERE id=?", [id], (err2, resultat) => {
            if (err2) return res.status(500).send( "Erreur SQL" );

            res.send( "Produit supprimé avec succès" );
        });
    });
});

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});