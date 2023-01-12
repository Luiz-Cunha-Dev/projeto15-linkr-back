import {
    addFollower,
    deleteFollower,
    getFollowById,
  getSessionByToken,
} from "../repository/follows.repository.js";

export async function getFollow(req, res) {
  const { authorization } = req.headers;
  const {id} = req.params;

  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const token = authorization?.replace("Bearer ", "");
  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    const following = await getFollowById(id, session.rows[0].userId)    

    res.send(following.rows[0]).status(200);

  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function follow(req, res) {
  const { authorization } = req.headers;
  const {id} = req.params;


  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const token = authorization?.replace("Bearer ", "");
  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    await addFollower(id, session.rows[0].userId);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function unfollow(req, res) {
  const { authorization } = req.headers;
  const {id} = req.params;


  if (!authorization) {
    res.sendStatus(401);
    return;
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const session = await getSessionByToken(token);

    if (session.rows.length === 0) {
      res.sendStatus(401);
      return;
    }

    await deleteFollower(id, session.rows[0].userId);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
