import db from "#db/client";

export async function createArrayOfTags() {
  const sql = `
    INSERT INTO posts_array
    SELECT post_id, array_agg(tag_id) AS post_tags
    FROM posts
    JOIN post_tags USING (post_id)
    GROUP BY post_id
    `;
  const {
    rows: [array],
  } = await db.query(sql);
  return array;
}

export async function getArrayByPostId(post_id) {
  const sql = `
    SELECT p.post_id, t.name
    FROM posts_array p
    CROSS JOIN unnest(post_tags) AS tag_id
    JOIN tags t USING (tag_id)
    WHERE post_id = $1
  `;
  const {
    rows: [array],
  } = await db.query(sql, [post_id]);
  return array;
}

export async function getArrays() {
  const sql = `
    SELECT *
    FROM posts_array
    RETURNING *
    `;

  const { rows: arrays } = await db.query(sql);
  return arrays;
}
