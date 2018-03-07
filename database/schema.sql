DROP DATABASE IF EXISTS userbase;

CREATE DATABASE userbase;

USE userbase;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  pw VARCHAR(300),
  email VARCHAR(255),
  genre VARCHAR(30),
  salt VARCHAR(255),
  profilepic VARCHAR(600)
);

CREATE TABLE tracks (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  files VARCHAR(600),
  userid INT
);

ALTER TABLE tracks ADD FOREIGN KEY (userID) REFERENCES users(id);

/*Placeholder Data*/
INSERT INTO users (
  firstname,
  lastname,
  pw,
  email,
  genre,
  salt,
  profilepic
  ) VALUES (
  'Ozzy',
  'Osbourne',
  'porra9090',
  'ozzy@gmail.com',
  'Metal',
  '$2a$04$M0zPYwllNPuXydAxYVlsru',
  '/Users/vpereira1982/Desktop/GoMixMe/userfiles/1520305869370_ingrid.PNG'
);

INSERT INTO tracks (files, userid) VALUES ('teste.mp3', 1);

