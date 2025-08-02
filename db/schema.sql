DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS post_tags;
DROP TABLE IF EXISTS post_array;
DROP TABLE IF EXISTS bookmarks;

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE tags (
  tag_id serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE posts (
  post_id serial PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  user_id integer NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  created_at timestamp
);

-- each post can have multiple categories
CREATE TABLE post_tags(
  post_id INT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

CREATE TABLE posts_array (
  post_id serial primary key REFERENCES posts(post_id) ON DELETE CASCADE,
  post_tags integer[]
);

CREATE TABLE bookmarks (
  user_id integer REFERENCES users(user_id) ON DELETE CASCADE,
  post_id integer REFERENCES posts(post_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id)
);



