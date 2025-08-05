import db from "#db/client";
import { createPost } from "#db/queries/posts";
import { createUser } from "#db/queries/users";
import { createTag, getTags } from "#db/queries/tags";
import { createBookmark } from "#db/queries/bookmarks";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const timestamp = new Date();
  const user = await createUser("Yoshi127", "password123");
  await createPost("idea 1", "first idea", user.user_id, timestamp, [
    "dogs",
    "treats",
    "toys",
  ]);
}

// when inserting arrays manualy it is '{text, text}'
// insert into posts (title, body, user_id, created_at, post_tags) values ('idea 3', 'get some food', 1, CURRENT_TIMESTAMP, '{dogs, food}');
