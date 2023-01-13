import { getLikesByPostId, getLastTwoUsernamesByPostId, deleteUserLike, postUserLike } from "../repository/likes.repository.js";

export async function getLikes(req, res){
    const { postId } = req.params;
    console.log(postId)
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

        res.status(200).send({
            post: post.rows,
            usernamesLastTwoLikes: usernames.rows
        })
        res.sendStatus(200)
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function postLikes(req, res){
    const { userId, postId } = req.body;

    try{
        const insertLike = await postUserLike(userId, postId);
        console.log(insertLike)
        
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

        res.status(200).send({
            post: post.rows,
            usernamesLastTwoLikes: usernames.rows
        })
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function deleteLikes(req, res){
    const { userId, postId } = req.body;

    try{
        const deleteLike = await deleteUserLike(userId, postId);
        console.log(deleteLike)
        
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

        res.status(200).send({
            post: post.rows,
            usernamesLastTwoLikes: usernames.rows
        })
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}