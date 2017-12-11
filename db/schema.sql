### Schema
CREATE DATABASE quotes_db;
USE quotes_db;

CREATE TABLE quotes
(
	id int NOT NULL AUTO_INCREMENT,
	author varchar(255) NOT NULL,
	lyrics TEXT NOT NULL,
	upvote INT(10) NOT NULL
	downvote INT(10) NOT NULL
	PRIMARY KEY (id)
);