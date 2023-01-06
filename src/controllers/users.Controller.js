import { getPostById, getUserbyId, getUsersByName } from "../repository/users.repository.js";

export async function getUsers(req, res){
    const {username} = req.body;

    try{
        const users = await getUsersByName(username)

        res.send(users.rows).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}