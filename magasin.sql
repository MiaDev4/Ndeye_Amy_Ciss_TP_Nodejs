create database magasin_db;
 use magasin_db;
 
 create table produits(id int auto_increment,nom varchar(100) not null,prix decimal(10.2) not null,quantite int not null,
 categorie varchar(50) not null,date_ajout timestamp default current_timestamp , constraint PK_prod primary key(id));
 
 insert into produits(nom,prix,quantite,categorie) 
 values('Cahier 100 pages',500,50,'Fourniture'),
		('Stylo bleu',150,20,'Accessoire'),
        ('Sac à dos',1500,20,'Fourniture'),
        ('Règle 30cm',200,0,'Eléctronique'),
        ('Calculatrice scientifique',8000,15,'Eléctronique'),
        ('Crayon HB',100,200,'Fourniture');
        
        select * from produits;