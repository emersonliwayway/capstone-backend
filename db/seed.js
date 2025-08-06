import db from "#db/client";
import { createPost } from "#db/queries/posts";
import { createUser } from "#db/queries/users";
import { createTag } from "#db/queries/tags";
import { createPostTag } from "#db/queries/post_tags";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i < 11; i++) {
    await createTag("tag #" + i);
  }

  for (let i = 1; i < 6; i++) {
    const user = await createUser("user" + i, "password" + i);
    for (let j = 1; j < 3; j++) {
      const timestamp = new Date();
      const post = await createPost(
        `post ${j} by ${user.username}`,
        "desciption of post",
        user.user_id,
        timestamp
      );
      for (let k = 1; k < 3; k++) {
        const random = Math.floor(Math.random() * 10 + 1);
        await createPostTag(post.post_id, random);
      }
    }
  }
}
