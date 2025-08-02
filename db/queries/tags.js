import db from "#db/client";

export async function createTag(name) {
  const sql = `
    INSERT INTO tags
      (name)
    VALUES
      ($1)
    RETURNING *
    `;

  const {
    rows: [tag],
  } = await db.query(sql, [name]);
  return tag;
}

// CANNOT DELETE TAGS bc posts_array
// export async function deleteTag(id) {
//   const sql = `
//     DELETE FROM tags
//     WHERE id = $1
//     RETURNING *
//     `;

//   const {
//     rows: [tag],
//   } = await db.query(sql, [id]);
//   return tag;
// }
