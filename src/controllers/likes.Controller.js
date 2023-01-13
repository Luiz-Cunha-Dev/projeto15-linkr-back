import { getLikesByPostId, getLastTwoUsernamesByPostId } from "../repository/likes.repository.js";

export async function getLikes(req, res){
    const { postId } = req.params;

    try{
        const post = await getLikesByPostId(postId);
        console.log(post)
        if(post.rowCount === 0) {
            return res.status(404).send("postId não encontrado");
        }
        console.log(post.likes)

        const usernames = await getLastTwoUsernamesByPostId(postId);
        console.log(usernames)
        if(usernames.rowCount === 0) {
            return res.status(404).send("usernames não encontrados");
        }

        res.send({
            post: post.rows,
            usernamesLastTwoLikes: usernames.rows
        }).status(200)
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function postLikes(req, res){
    const { postId } = req.params;

    try{
        const post = await getLikesByPostId(postId);
        console.log(post)
        if(post.rowCount === 0) {
            return res.status(404).send("postId não encontrado");
        }
        console.log(post.likes)

        const usernames = await getLastTwoUsernamesByPostId(postId);
        console.log(usernames)
        if(usernames.rowCount === 0) {
            return res.status(404).send("usernames não encontrados");
        }

        res.send({
            post: post.rows,
            usernamesLastTwoLikes: usernames.rows
        }).status(200)
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function deleteLikes(req, res){
    const { postId } = req.params;

    try{
        const post = await getLikesByPostId(postId)
        console.log(post)
        if(post.rowCount === 0) {
            return res.status(404).send("postId não Encontrado");
        }
        res.send(post.rows).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}