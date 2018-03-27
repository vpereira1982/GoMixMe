 DROP DATABASE IF EXISTS userbase;

CREATE DATABASE userbase;

USE userbase;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30),
  lastname VARCHAR(30),
  displayname VARCHAR(30),
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
  description VARCHAR(300),
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
  description VARCHAR(300),
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

ALTER TABLE mixes ADD FOREIGN KEY (userId) REFERENCES users(id);
ALTER TABLE multitracks ADD FOREIGN KEY (userId) REFERENCES users(id);
ALTER TABLE comments_mixes ADD FOREIGN KEY (trackId) REFERENCES mixes(id);
ALTER TABLE comments_mixes ADD FOREIGN KEY (userId) REFERENCES users(id);
ALTER TABLE comments_mtracks ADD FOREIGN KEY (trackId) REFERENCES multitracks(id);
ALTER TABLE comments_mtracks ADD FOREIGN KEY (userID) REFERENCES users(id);


/*Placeholder Data*/
/*INSERT INTO users (
  firstname,
  lastname,
  displayname,
  pw,
  email,
  genre,
  salt,
  profilepic
  ) VALUES (
  'Ozzy',
  'Osbourne',
  'Ozzy666',
  'porra9090',
  'ozzy@gmail.com',
  'Metal',
  '$2a$04$M0zPYwllNPuXydAxYVlsru',
  '1520318251600_croppedImg.png'
);

INSERT INTO mixes (
  id,
  file,
  userId,
  image,
  artist,
  title,
  genre,
  description,
  displayname,
  isMix
  ) VALUES (
  '3-addafasg',
  '{"MIX": "mix"}',
  1,
  '{"filename": "default-profile.jpg"}',
  'Pink Floud',
  'Breath',
  'Progressive',
  'Our song is beautiful',
  'Ozzy666',
  true
);

INSERT INTO multitracks (
  id,
  previewFile,
  files,
  userId,
  image,
  artist,
  title,
  genre,
  description,
  displayname,
  isMix
  ) VALUES (
  '3-addafasg',
  '{"MULTITRACK": "multitrack"}',
  '{"MULTITRACK": "multitrack"}',
  1,
  '{"filename": "default-profile.jpg"}',
  'Ozzy',
  'Lay Your World On Me',
  'metal',
  'Our song is beautiful',
  'Ozzy666',
  false
);*/


