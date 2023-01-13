import { connection } from "../database/db.js";

export function getLikesByPostId(postId) {
    return connection.query(
      `SELECT 
      posts.likes
      FROM posts 
      WHERE posts.id=$1
    ;`,
      [postId]
    );
}

export function getLastTwoUsernamesByPostId(postId) {
    return connection.query(
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

export function postUserLike(userId, postId) {
  return connection.query(
    `INSERT INTO "usersLikes"(
      "userId", "postId")
      VALUES ($1, $2);
  ;`,
    [userId, postId]
  );
}

export function deleteUserLike(userId, postId) {
  return connection.query(
    `DELETE FROM "usersLikes"
      WHERE "usersLikes"."userId"=$1 AND "usersLikes"."postId"=$2;
  ;`,
  [userId, postId]
  );
}