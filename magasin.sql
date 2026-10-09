create database magasin_db;
 use magasin_db;
 
 create table produits(id int auto_increment,nom varchar(100) not null,prix decimal(10.2) not null,quantite int not null,
 categorie varchar(50) not null,date_ajout timestamp default current_timestamp , constraint PK_prod primary key(id));
 
 CREATE TABLE ventes (
    id INT AUTO_INCREMENT ,produit_id INT NOT NULL,quantite INT NOT NULL,prix_unitaire INT NOT NULL,
    total INT NOT NULL,date_vente TIMESTAMP DEFAULT CURRENT_TIMESTAMP,constraint PK_vente primary key( id),constraint FK_vente
    FOREIGN KEY (produit_id) REFERENCES produits(id) on delete cascade on update cascade);

 
 insert into produits(nom,prix,quantite,categorie) 
 values('Cahier 100 pages',500,50,'Fourniture'),
		('Stylo bleu',150,20,'Accessoire'),
        ('Sac à dos',1500,20,'Fourniture'),
        ('Règle 30cm',200,0,'Eléctronique'),
        ('Calculatrice scientifique',8000,15,'Eléctronique'),
        ('Crayon HB',100,200,'Fourniture');
        
        select * from produits;
		select * from ventes;

        show tables;