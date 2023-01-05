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
    const comment = post.comment;

    await insertPost(userId, link, comment);

    res.sensStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
