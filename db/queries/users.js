import db from "#db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}

// export async function validateAccount({ email, password }) {
//   const SQL = `
//     SELECT *
//     FROM users
//     WHERE email = $1 AND password = crypt($2, password)
//     `;

//   const {
//     rows: [user],
//   } = await db.query(SQL, [email, password]);

//   return user || undefined;
// }

// export function createJWT(id) {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// }

// export async function validateJWT(token) {
//   return jwt.verify(token, process.env.JWT_SECRET);
// }
