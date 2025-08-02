import db from "#db/client";

// how to do timestamp
export async function createPost(title, body, user_id, created_at) {
  const sql = `
    INSERT INTO posts
      (title, body, user_id, created_at)
    VALUES
      ($1, $2, $3, $4)
    RETURNING *
    `;

  const {
    rows: [post],
  } = await db.query(sql, [title, body, user_id, created_at]);
  return post;
}

export async function getPosts() {
  const sql = `
    SELECT *
    FROM posts
    RETURNING *
    `;

  const { rows: posts } = await db.query(sql);
  return posts;
}

export async function deletePost(post_id) {
  const sql = `
    DELETE FROM posts
    WHERE post_id = $1
    RETURNING *
  `;

  const {
    rows: [post],
  } = await db.query(sql, [post_id]);
}

export async function getPostById(post_id) {
  const sql = `
  SELECT *
  FROM posts
  WHERE post_id = $1
  `;

  const {
    rows: [post],
  } = await db.query(sql, [post_id]);
  return post;
}

export async function deletePost(post_id) {
  const sql = `
  DELETE FROM posts
  WHERE post_id = $1
  RETURNING *
  `;

  const {
    rows: [post],
  } = await db.query(sql, [post_id]);
  return post;
}

export async function getPostsByUserId(user_id) {
  const sql = `
  SELECT *
  FROM posts
  WHERE user_id = $1
  `;

  const { rows: posts } = await db.query(sql, [user_id]);
  return posts;
}

export async function getPostsByTagId(tag_id) {
  const sql = `
  SELEct posts.*
  FROM posts
  JOIN post_tags ON post_tags.tag_id = $1
  `;

  const { rows: posts } = await db.query(sql, [tag_id]);
  return posts;
}
