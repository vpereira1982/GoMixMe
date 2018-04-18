DROP DATABASE IF EXISTS userbase;

CREATE DATABASE userbase;

USE userbase;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  displayname VARCHAR(30),
  description VARCHAR(350),
  pw VARCHAR(300),
  email VARCHAR(255),
  genre VARCHAR(30),
  salt VARCHAR(255),
  profilepic VARCHAR(600)
);

CREATE TABLE mixes (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  file JSON,
  image JSON,
  artist VARCHAR(30),
  title VARCHAR(30),
  genre VARCHAR(15),
  description VARCHAR(350),
  displayname VARCHAR(30),
  isMix BOOLEAN,
  userId INT
);

CREATE TABLE multitracks (
  id VARCHAR(50) NOT NULL PRIMARY KEY,
  files JSON,
  previewFile JSON,
  image JSON,
  artist VARCHAR(30),
  title VARCHAR(30),
  genre VARCHAR(15),
  description VARCHAR(350),
  displayname VARCHAR(30),
  isMix BOOLEAN,
  userId INT
);

CREATE TABLE comments_mixes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  trackId VARCHAR(50) NOT NULL,
  userId INT,
  comment VARCHAR(300),
  dt DATETIME
);

CREATE TABLE comments_mtracks (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  trackId VARCHAR(50) NOT NULL,
  userId INT,
  comment VARCHAR(300),
  dt DATETIME
);

ALTER TABLE mixes ADD FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE multitracks ADD FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE comments_mixes ADD FOREIGN KEY (trackId) REFERENCES mixes(id) ON DELETE CASCADE;
ALTER TABLE comments_mixes ADD FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE;
ALTER TABLE comments_mtracks ADD FOREIGN KEY (trackId) REFERENCES multitracks(id) ON DELETE CASCADE;
ALTER TABLE comments_mtracks ADD FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE;