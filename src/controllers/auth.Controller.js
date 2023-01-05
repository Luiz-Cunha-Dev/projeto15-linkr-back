import { getSessionByToken, deleteSession } from "../repository/auth.repository.js";

export async function logout(req, res){
    const {authorization} = req.headers;

    if(!authorization){
        res.sendStatus(401);
        return;
    }

    const token = authorization.replace("Bearer ", "");

    try{
        const session = await getSessionByToken(token);

        if(session.rows.length === 0){
            res.sendStatus(401)
            return
        }

        await deleteSession(session.rows[0].userId)
    
        res.sendStatus(200);
        
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}