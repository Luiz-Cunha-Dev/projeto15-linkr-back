import { connection } from "../database/db.js";

export async function getLikesByPostId(postId) {
    return await connection.query(
      `SELECT 
      posts.likes
      FROM posts 
      WHERE posts.id=$1
    ;`,
      [postId]
    );
}

export async function getLastTwoUsernamesByPostId(postId) {
    return await connection.query(
      `SELECT 
      "usersLikes".*,
      users.username
      FROM "usersLikes"
          JOIN users ON "usersLikes"."userId"=users.id
      WHERE "usersLikes"."postId"=$1
      ORDER BY "usersLikes".id DESC
      LIMIT 2
    ;`,
      [postId]
    );
}

export async function postUserLike(userId, postId) {
  return await connection.query(
    `INSERT INTO "usersLikes"(
      "userId", "postId")
      VALUES ($1, $2);
  ;`,
    [userId, postId]
  );
}

export async function deleteUserLike(userId, postId) {
  return await connection.query(
    `DELETE FROM "usersLikes"
      WHERE "usersLikes"."userId"=$1 AND "usersLikes"."postId"=$2;
  ;`,
  [userId, postId]
  );
}