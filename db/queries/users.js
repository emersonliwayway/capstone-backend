import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser(username, password) {
  const sql = `
  INSERT INTO users
    (username, password)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserByUsernameAndPassword(username, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

export async function getUserById(user_id) {
  const sql = `
  SELECT *
  FROM users
  WHERE user_id = $1
  `;

  const {
    rows: [user],
  } = await db.query(sql, [user_id]);
  return user;
}

export async function updateUsername(username) {
  const sql = `
  UPDATE users
  SET username = $2
  WHERE user_id = $1
  `;

  const {
    rows: [user],
  } = await db.query(sql, [username]);
}

export async function updatePassword(password) {
  const sql = `
  UPDATE users
  SET password = $2
  WHERE user_id = $1
  `;

  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [hashedPassword]);
  return user;
}
