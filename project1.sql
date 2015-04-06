CREATE TABLE Fire_poke (PokeID int(11) NOT NULL, Name varchar(140) NOT NULL, HP int(11) NOT NULL, Attack int(11) NOT NULL,
Defense int(11) NOT NULL, SP_attack int(11) NOT NULL, SP_defense int(11) NOT NULL, Speed int(11) NOT NULL, Total int(11) AS 
(HP + Attack + Defense + SP_attack + SP_defense + Speed) VIRTUAL,PRIMARY KEY (PokeID));
CREATE TABLE Water_poke (PokeID int(11) NOT NULL, Name varchar(140) NOT NULL, HP int(11) NOT NULL, Attack int(11) NOT NULL,
Defense int(11) NOT NULL, SP_attack int(11) NOT NULL, SP_defense int(11) NOT NULL, Speed int(11) NOT NULL, Total int(11) AS 
(HP + Attack + Defense + SP_attack + SP_defense + Speed) VIRTUAL,PRIMARY KEY (PokeID));
CREATE TABLE Grass_poke (PokeID int(11) NOT NULL, Name varchar(140) NOT NULL, HP int(11) NOT NULL, Attack int(11) NOT NULL,
Defense int(11) NOT NULL, SP_attack int(11) NOT NULL, SP_defense int(11) NOT NULL, Speed int(11) NOT NULL, Total int(11) AS 
(HP + Attack + Defense + SP_attack + SP_defense + Speed) VIRTUAL,PRIMARY KEY (PokeID));
CREATE TABLE Fighting_poke (PokeID int(11) NOT NULL, Name varchar(140) NOT NULL, HP int(11) NOT NULL, Attack int(11) NOT NULL,
Defense int(11) NOT NULL, SP_attack int(11) NOT NULL, SP_defense int(11) NOT NULL, Speed int(11) NOT NULL, Total int(11) AS 
(HP + Attack + Defense + SP_attack + SP_defense + Speed) VIRTUAL,PRIMARY KEY (PokeID));
CREATE TABLE Psychic_poke (PokeID int(11) NOT NULL, Name varchar(140) NOT NULL, HP int(11) NOT NULL, Attack int(11) NOT NULL,
Defense int(11) NOT NULL, SP_attack int(11) NOT NULL, SP_defense int(11) NOT NULL, Speed int(11) NOT NULL, Total int(11) AS 
(HP + Attack + Defense + SP_attack + SP_defense + Speed) VIRTUAL,PRIMARY KEY (PokeID));
CREATE TABLE Ground_poke (PokeID int(11) NOT NULL, Name varchar(140) NOT NULL, HP int(11) NOT NULL, Attack int(11) NOT NULL,
Defense int(11) NOT NULL, SP_attack int(11) NOT NULL, SP_defense int(11) NOT NULL, Speed int(11) NOT NULL, Total int(11) AS 
(HP + Attack + Defense + SP_attack + SP_defense + Speed) VIRTUAL,PRIMARY KEY (PokeID));


Create Table Fire_moves(PokeID int references Fire_poke(PokeID), Name varchar(140) references Fire_poke(Name),
MoveName varchar(140) Not NUll, Category Varchar(140), PP int NOT NULL, Power int, Accuracy int, Primary Key(PokeID, MoveName)); 

Create Table Water_moves(PokeID int references Water_poke(PokeID), Name varchar(140) references Water_poke(Name),
MoveName varchar(140)NOT NULL, Category Varchar(140), PP int NOT NULL, Power int, Accuracy int, Primary Key(PokeID, MoveName)); 

Create Table Grass_moves(PokeID int references Grass_poke(PokeID), Name varchar(140) references Grass_poke(Name),
MoveName varchar(140)NOT NULL, Category Varchar(140), PP int NOT NULL, Power int, Accuracy int, Primary Key(PokeID, MoveName));

Create Table Fighting_moves(PokeID int references Fighting_poke(PokeID), Name varchar(140) references Fighting_poke(Name),
MoveName varchar(140)NOT NULL, Category Varchar(140), PP int NOT NULL, Power int, Accuracy int, Primary Key(PokeID, MoveName));  

Create Table Psychic_moves(PokeID int references Psychic_poke(PokeID), Name varchar(140) references Psychic_poke(Name),
MoveName varchar(140) NOT NULL, Category Varchar(140), PP int NOT NULL, Power int, Accuracy int, Primary Key(PokeID, MoveName)); 

Create Table Ground_moves(PokeID int references Ground_poke(PokeID), Name varchar(140) references Ground_poke(Name),
MoveName varchar(140) NOT NULL, Category Varchar(140), PP int NOT NULL, Power int, Accuracy int, Primary Key(PokeID, MoveName)); 

