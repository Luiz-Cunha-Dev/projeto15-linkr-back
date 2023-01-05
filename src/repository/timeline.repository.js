import { connection } from "../database/db.js";

export function insertPost(userId, link, comment) {
  return connection.query(
    `INSERT INTO posts ("userId", link, comment, likes, "usersLikesId" ) VALUES ($1, $2, $3, $4, $5);`,
    [userId, link, comment, 0, 0]
  );
}
