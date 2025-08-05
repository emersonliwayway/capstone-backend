import db from "#db/client";

export async function getTags() {
  const sql = `
  SELECT *
  FROM tags
  `;

  const { rows: tags } = await db.query(sql);
  return tags;
}

export async function createTag(tag_name) {
  const sql = `
  INSERT INTO tags
    (tag_name)
  VALUES
    ($1)
  RETURNING *
  `;

  const {
    rows: [tag],
  } = await db.query(sql, [tag_name]);
  return tag;
}

export async function deleteTag(id) {
  const sql = `
    DELETE FROM tags
    WHERE tag_id = $1
    RETURNING *
    `;

  const {
    rows: [tag],
  } = await db.query(sql, [id]);
  return tag;
}

export async function getTagById(id) {
  const sql = `
  SELECT *
  FROM tags
  WHERE tag_id = $1
  `;

  const {
    rows: [tag],
  } = await db.query(sql, [id]);
  return tag;
}

// questionable, faster searching ?
export async function getTagByName(tag_name) {
  const sql = `
  SELECT *
  FROM tags
  WHERE tag_name LIKE $1
  `;

  const {
    rows: [tag],
  } = await db.query(sql, [tag_name]);
  return tag;
}
