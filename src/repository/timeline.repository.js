import { connection } from "../database/db.js";

export function insertPost(userId, linksId, comments) {
  return connection.query(
    `INSERT INTO posts ("userId", linksId, comment, likes, "usersLikesId" ) VALUES ($1, $2, $3, $4, $5);`,
    [userId, linksId, comments, 0, 0]
  );
}

export function insertLink(title, description, url, image) {
  return connection.query(
    `INSERT INTO links ("linkTitle", "linkDescription", "linkUrl", "linkImage") VALUES ($1,$2,$3,$4) RETURNING id;`,
    [title, description, url, image]
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

export function selectAllPosts() {
  return connection.query(
    `SELECT 
  users.username,
  users."pictureUrl", 
  posts."likes",
  posts.comments, 
  links."linkTitle",
  links."linkDescription", 
  links."linkUrl", 
  links."linkImage"
  FROM posts 
  JOIN users ON posts."userId"=users.id 
  JOIN links ON posts."linksId"=links.id 
  ORDER BY posts.id DESC
  LIMIT 20
  ;`
  );
}

export function selectPostsById(userId) {
  return connection.query(
    `SELECT 
  users.username,
  users."pictureUrl", 
  posts."likes",
  posts.comments, 
  links."linkTitle",
  links."linkDescription", 
  links."linkUrl", 
  links."linkImage"
  FROM posts 
  JOIN users ON posts."userId"=users.id 
  JOIN links ON posts."linksId"=links.id 
  WHERE users.id=$1 
  ORDER BY posts.id DESC
  LIMIT 20
  ;`,
    [userId]
  );
}
