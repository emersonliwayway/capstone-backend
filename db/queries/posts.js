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

// TODO: i think only for getPosts join posts_categories ?
export async function getPosts() {}

export async function getPostById(id) {}

export async function getPostByUserId(id) {}

export async function getPostByCategoryId(id) {}
