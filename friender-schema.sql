CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY CHECK (username = lower(username)),
  password VARCHAR(16) NOT NULL,
  hobbies TEXT,
  number_street_name VARCHAR(50),
  city VARCHAR(50),
  friend_radius INTEGER CHECK (friend_radius > 5),
  photo_url TEXT,
);

CREATE TABLE messages (
  content TEXT,
  sent_at TIMESTAMP WITH LOCAL TIME ZONE,
  id SERIAL PRIMARY KEY,
  sent_by REFERENCES users
  sent_to REFERENCES users
);

