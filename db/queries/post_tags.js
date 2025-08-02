import db from "#db/client";

export async function addTagsToPost(post_id, tag_id) {
  const sql = `
    INSERT INTO post_tags
      (post_id, tag_id)
    VALUES
      ($1, $2)
    RETURNING *
    `;

  const {
    rows: [post_tags],
  } = await db.query(sql, [post_id, tag_id]);
  return post_tags;
}
