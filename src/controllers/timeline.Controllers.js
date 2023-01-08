import { getSessionByToken } from "../repository/auth.repository.js";
import urlMetadata from "url-metadata";
import {
  deleteOnePost,
  insertLink,
  insertPost,
  insertUpdatedPost,
  selectAllPosts,
  getAllPosts,
  selectPostsById,
  selectUserId,
  getAllLinks,
} from "../repository/timeline.repository.js";

export async function createPost(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const token = authorization.replace("Bearer ", "");

  const { link, comments } = req.body;
  let linksId;
  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }
    const userId = session.rows[0].userId;

    console.log("userId, link, comments", userId, link, comments);

    await urlMetadata(link)
      .then(async (l) => {
        const { rows } = await insertLink(
          l.title,
          l.description,
          l.url,
          l.image
        );

        console.log("rows", rows[0]);
        linksId = rows[0].id;
        console.log("linksId", linksId);

        await insertPost(userId, linksId, comments);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("userId, linksId, comments", userId, linksId, comments);
    res.status(201).send("Post criado");
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
  const post = req.body;

  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const id = post.id;
    const comments = post.comments;

    const postUserId = await selectUserId(id);

    if (postUserId.rows[0].userId !== session.rows[0].userId) {
      res.sendStatus(401);
      return;
    }

    await insertUpdatedPost(comments, id);

    res.sendStatus(200);
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
  const post = req.data;

  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const id = post.id;

    const postUserId = await selectUserId(id);

    if (postUserId !== session.rows[0].userId) {
      res.sendStatus(401);
      return;
    }

    await deleteOnePost(id);

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPosts(req, res) {
  try {
    const { rows } = await selectAllPosts();

    console.log("posts", rows);
    const postsArray = rows.map((p) => {
      return {
        userName: p.username,
        userImage: p.pictureUrl,
        likesCount: p.likes,
        postComment: p.comments,
        linkInfo: {
          linkTitle: p.linkTitle,
          linkDescription: p.linkDescription,
          linkUrl: p.linkUrl,
          linkImage: p.linkImage,
        },
      };
    });
    res.send(postsArray);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

//Como usuário logado, quero ver os posts de um usuário na rota "/user/:id"
export async function getPostsById(req, res) {
  const { userId } = res.locals.user;
  try {
    const { rows } = await selectPostsById(userId);
    const postsArray = rows.map((p) => {
      return {
        userName: p.username,
        userImage: p.pictureUrl,
        likesCount: p.likes,
        postComment: p.comments,
        linkInfo: {
          linkTitle: p.linkTitle,
          linkDescription: p.linkDescription,
          linkUrl: p.linkUrl,
          linkImage: p.linkImage,
        },
      };
    });
    res.send(postsArray);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
