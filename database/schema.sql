DROP DATABASE IF EXISTS userbase;

CREATE DATABASE userbase;

USE userbase;

CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(30), lastname VARCHAR(30), pw VARCHAR(300), email VARCHAR(255), genre VARCHAR(30), salt VARCHAR(255), file VARCHAR(600));

CREATE TABLE tracks (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, file VARCHAR(600), userid INT);

ALTER TABLE tracks ADD FOREIGN KEY (userID) REFERENCES users(id);

/*INSERT INTO users (firstname, lastname, pw, email, genre, salt, file) VALUES ('Ozzy', 'Osbourne', 'porra9090', 'ozzy@gmail.com', 'Metal', '$2a$04$M0zPYwllNPuXydAxYVlsru', '1508984120672_10 Beggin For Thread.mp3');

INSERT INTO tracks (file, userid) VALUES ('teste.mp3', 1);*/

