import express from "express";
const router = express.Router();
export default router;

import {
  getPosts,
  createPost,
  deletePost,
  getPostById,
  getPostsByUserId,
} from "#db/queries/posts";

import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

router.route("/").get(async (req, res) => {
  const posts = await getPosts();
  res.send(posts);
});

router
  .route("/")
  .post(
    requireUser,
    requireBody(["title", "body", "post_tags"]),
    async (req, res) => {
      const { title, body, post_tags } = req.body;
      const timestamp = new Date();
      const post = await createPost(
        title,
        body,
        req.user.user_id,
        timestamp,
        post_tags
      );
      res.status(201).send(post);
    }
  );

router.param("id", async (req, res, next, id) => {
  const post = await getPostById(id);
  if (!post) return res.status(404).send("Post not found.");
  req.post = post;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.post);
});

router.route("/:id").delete(requireUser, async (req, res) => {
  if (req.user.user_id !== req.post.post_id) {
    return res.status(401).send("Post not made by user.");
  }
  await deletePost(req.post.post_id);
  res.sendStatus(204);
});
