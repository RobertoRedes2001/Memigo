DROP DATABASE IF EXISTS memigo_v1;
CREATE DATABASE IF NOT EXISTS memigo_v1;
USE memigo_v1;

CREATE TABLE users(
	idUser INT NOT NULL AUTO_INCREMENT,
	nameUser VARCHAR(50) NOT NULL,
	passUser VARCHAR(200) NOT NULL,
	email VARCHAR(200) NOT NULL,
	imgUser MEDIUMTEXT,
	PRIMARY KEY(idUser)
);

CREATE TABLE templates(
	idTemplate INT NOT NULL AUTO_INCREMENT,
	imgTemplate MEDIUMTEXT NOT NULL,
	PRIMARY KEY(idTemplate)  
);

CREATE TABLE memes(
	idMeme INT NOT NULL AUTO_INCREMENT,
	idTemplate INT,
	idUser INT NOT NULL,
	imgMeme MEDIUMTEXT NOT NULL,
	likes INT NOT NULL DEFAULT 0,
	PRIMARY KEY(idMeme) 
); 

ALTER TABLE memes ADD CONSTRAINT fk_memes_usu FOREIGN KEY 
(idUser) REFERENCES users (idUser);

ALTER TABLE memes ADD CONSTRAINT fk_memes_temp FOREIGN KEY 
(idTemplate) REFERENCES templates (idTemplate);