import express from "express";
const router = express.Router();
export default router;

import {
  createUser,
  getUserById,
  getUserByUsernameAndPassword,
} from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";
import { createToken } from "#utils/jwt";
import { getBookmarksByUserId } from "#db/queries/bookmarks";
import getUserFromToken from "#middleware/getUserFromToken";

router
  .route("/register")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);

    const token = await createToken({ id: user.user_id });
    res.status(201).send(token);
  });

router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(401).send("Invalid username or password.");

    const token = await createToken({ id: user.user_id });
    res.send(token);
  });

// router.route("/:id/bookmarks").get(requireUser, async (req, res) => {
//   const bookmarks = await getBookmarksByUserId(req.user.user_id);
//   if (!bookmarks) return res.status(404).send("No bookmarks found.");
//   res.send(bookmarks);
// });

// router.route("/:id/bookmarks/:id").delete(requireUser, async (req, res) => {});
