import { getSessionByToken } from "../repository/auth.repository.js";
import {
  deleteOnePost,
  insertPost,
  insertUpdatedPost,
  selectUserId,
} from "../repository/timeline.repository.js";

export async function createPost(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const token = authorization.replace("Bearer ", "");
  const post = req.res;
  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }
    const userId = session.useId;
    const link = post.link;
    const comments = post.comments;

    await insertPost(userId, link, comments);

    res.sensStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function updatePost(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
    return;
  }
  const token = authorization.replace("Bearer ", "");
  const post = req.res; 

  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const id = post.id;
    const comments = post.comments;

    const postUserId = await selectUserId(id);

    if (postUserId !== session.useId) {
      res.sendStatus(401);
      return;
    }

    await insertUpdatedPost(comments, id);

    res.sensStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}


export async function deletePost(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
    return;
  }
  const token = authorization.replace("Bearer ", "");
  const post = req.res; 

  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const id = post.id;

    const postUserId = await selectUserId(id);

    if (postUserId !== session.useId) {
      res.sendStatus(401);
      return;
    }

    await deleteOnePost(id);

    res.sensStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
