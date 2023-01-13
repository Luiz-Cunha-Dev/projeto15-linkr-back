import { connection } from "../database/db.js";

export function checkHashtag(hashtag) {
  return connection.query(`SELECT * FROM hashtags WHERE hashtag=$1`, [hashtag]);
}

export function getAllHashtags() {
  return connection.query(`SELECT * FROM hashtags`);
}

export function insertpostHashtags(postId, hashtagId) {
  return connection.query(
    `INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2) RETURNING id`,
    [postId, hashtagId]
  );
}

export function postHashtag(hashtag) {
  const newHashtag = hashtag.substring(1);

  return connection.query(
    `INSERT INTO hashtags (hashtag) VALUES ($1) RETURNING id;`,
    [newHashtag]
  );
}
