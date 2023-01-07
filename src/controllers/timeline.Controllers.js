import { getSessionByToken } from "../repository/auth.repository.js";
import urlMetaData from "url-metadata";
import {
  deleteOnePost,
  insertLink,
  insertPost,
  insertUpdatedPost,
  selectAllPosts,
  selectPostsById,
  selectUserId,
} from "../repository/timeline.repository.js";

export async function createPost(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const token = authorization.replace("Bearer ", "");

  const { link, comments } = req.body;
  let linkId;
  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }
    const userId = session.useId;

    urlMetaData(link)
      .then(async (l) => {
        const { rows } = await insertLink(
          l.title,
          l.description,
          l.url,
          l.image
        );
        linkId = rows[0].id;

        await insertPost(userId, linkId, comments);
      })
      .catch((err) => {
        console.log(err);
      });

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

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function getPosts(req, res) {

    try {
      const { rows } = await selectAllPosts();
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
    res.send(postsArray );
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
