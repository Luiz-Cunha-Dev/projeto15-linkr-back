import { getSessionByToken, getUsersByName } from "../repository/users.repository.js";

export async function getUsers(req, res){
    const {name} = req.body;

    try{
        const session = await getSessionByToken(token)

        if(session.rows.length === 0){
            res.sendStatus(401)
            return
        }

        const users = await getUsersByName(name)

        res.send(users.rows).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}