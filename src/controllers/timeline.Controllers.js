import { getSessionByToken } from "../repository/auth.repository.js";
import { connection } from "../database/db.js";
import urlMetadata from "url-metadata";
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

  const token = authorization?.replace("Bearer ", "");

  const { link, comments } = req.body;
  let linksId;

  try {
    const session = await getSessionByToken(token);

    const existingLink = await connection.query(
      `SELECT * FROM links WHERE "linkUrl"=$1`,
      [link]
    );

    if (!existingLink) {
    }
    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }
    const userId = session.rows[0].userId;

    await urlMetadata(link)
      .then(async (l) => {
        const { rows } = await insertLink(
          l.title,
          l.description,
          l.url,
          l.image
        );

        linksId = rows[0].id;
      })
      .catch((err) => {
        console.log(err);
      });

    await insertPost(userId, existingLink.rows[0].id, comments);
    res.status(201).send("Post criado");
  } catch (err) {
    console.log(err);
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
  const { authorization, postid } = req.headers;

  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      return res.status(401).send("Não existe sessão");
    }

    const postUserId = await selectUserId(postid);

    const postOwnerUserId = postUserId.rows[0].userId;
    const loggedUserId = session.rows[0].userId;

    if (Number(postOwnerUserId) != Number(loggedUserId)) {
      res.status(401).send("usuário não é o mesmo do post a DELETAR");
      return;
    }

    await deleteOnePost(postid);
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
        postId: p.postId,
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
  const { id } = req.params;
  try {
    const { rows } = await selectPostsById(id);
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
    console.log(err);
  }
}
