CREATE TABLE register (
  email VARCHAR(100),
  username VARCHAR(50),
  password VARCHAR(100),
  address VARCHAR(50),
  image VARCHAR(200)
);

CREATE TABLE users (
  id INT(10),
  email VARCHAR(100),  
  password VARCHAR(100),
  address VARCHAR(50), 
  username VARCHAR(50)
);

CREATE TABLE books (
  id INT(10),
  name VARCHAR(100),  
  author VARCHAR(100),
  count INT(10)
);

CREATE TABLE borrow (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50),
  email VARCHAR(100),
  bookname VARCHAR(100)
);
