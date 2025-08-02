import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createTag } from "#db/queries/tags";
import { createPost } from "#db/queries/posts";
import { addTagsToPost } from "#db/queries/post_tags";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO: create users, posts, and categories
  const timestamp = new Date();
  const user = await createUser("yoshi127", "password123");
  await createTag("dogs");
  await createTag("treats");
  await createPost(
    "yoshi's big idea",
    "give me a treat",
    user.user_id,
    timestamp
  );
  await createPost(
    "yoshi's idea 2",
    "take me for walk",
    user.user_id,
    timestamp
  );
  await addTagsToPost(1, 1);
  await addTagsToPost(1, 2);
  await addTagsToPost(2, 1);
}
