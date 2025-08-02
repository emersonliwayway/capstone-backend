import db from "#db/client";

export async function createArray() {}
const sql = `
INSERT INTO posts_array
SELECT post_id, array_agg(tag_id) AS post_tags
FROM posts
JOIN post_tags USING (post_id)
GROUP BY post_id;
`;

const sql3 = `
SELECT p.post_id, t.name
FROM posts_array p
CROSS JOIN unnest(post_tags) AS tag_id
JOIN tags t USING (tag_id)
WHERE post_id = $1;`;
