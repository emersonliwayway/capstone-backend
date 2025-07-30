DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS posts_categories;
DROP TABLE IF EXISTS categories_posts;
DROP TABLE IF EXISTS bookmarks;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  email text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE categories (
  id serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE posts (
  id serial PRIMARY KEY,
  title text NOT NULL,
  body text NOT NULL,
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamp
);

-- each post can have multiple categories
CREATE TABLE posts_categories (
  post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- each category will have multiple posts under it
CREATE TABLE categories_posts (
  category_id integer NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  post_id integer NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  quantity integer NOT NULL
);

CREATE TABLE bookmarks (
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  post_id integer REFERENCES posts(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, post_id)
);