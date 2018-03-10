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

CREATE TABLE mixes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  file JSON,
  image VARCHAR(600),
  artist VARCHAR(30),
  title VARCHAR(30),
  genre VARCHAR(15),
  description VARCHAR(300),
  userid INT
);

CREATE TABLE multitracks (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  file1 VARCHAR(600),
  file2 VARCHAR(600),
  file3 VARCHAR(600),
  file4 VARCHAR(600),
  file5 VARCHAR(600),
  file6 VARCHAR(600),
  file7 VARCHAR(600),
  file8 VARCHAR(600),
  file9 VARCHAR(600),
  userid INT
);

ALTER TABLE mixes ADD FOREIGN KEY (userID) REFERENCES users(id);
ALTER TABLE multitracks ADD FOREIGN KEY (userID) REFERENCES users(id);

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
  '/Users/vpereira1982/Desktop/GoMixMe/userfile/1520305869370_ingrid.PNG'
);

INSERT INTO mixes (
  file,
  userid,
  image,
  artist,
  title,
  genre,
  description
  ) VALUES (
  '{"mascot": "Our mascot is a dolphin named \\"Sakila\\"."}',
  1,
  'placeholder.jpg',
  'Ozzy',
  'Lay Your World On Me',
  'metal',
  'Our song is beautiful'
);

INSERT INTO multitracks (
  file1,
  file2,
  file3,
  file4,
  file5,
  file6,
  file7,
  file8,
  file9,
  userid
  ) VALUES (
  'guitarL.wav',
  'guitarR.wav',
  'bass-clean.wav',
  'vocals.wav',
  'ride.wav',
  'hi-hat.wav',
  'crash-left.wav',
  'crash-right.wav',
  'snare.wav',
  1
);


