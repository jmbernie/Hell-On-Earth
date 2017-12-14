### Schema
DROP DATABASE IF EXISTS quotes_db;
CREATE DATABASE quotes_db;
USE quotes_db;

CREATE TABLE quotes
(
	id int NOT NULL AUTO_INCREMENT,
	author varchar(255) NOT NULL,
	lyrics TEXT NOT NULL,
	upvote INT(10) DEFAULT 0,
	downvote INT(10) DEFAULT 0,
	PRIMARY KEY (id)
);