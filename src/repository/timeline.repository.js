import { connection } from "../database/db.js";

export function insertPost(userId, link, comments) {
  return connection.query(
    `INSERT INTO posts ("userId", link, comment, likes, "usersLikesId" ) VALUES ($1, $2, $3, $4, $5);`,
    [userId, link, comments, 0, 0]
  );
}

export function insertUpdatedPost(comments, id) {
  return connection.query(`UPDATE posts SET comments=$1  WHERE posts.id=$2;`, [
    comments,
    id,
  ]);
}

export function selectUserId(id) {
  return connection.query(`SELECT posts."userId" FROM posts WHERE id = $1`, [
    id,
  ]);
}

export function deleteOnePost(id) {
  return connection.query(`DELETE FROM posts WHERE id=$1;`, [id]);
}
