import { getSessionByToken, deleteSession, getUserByEmail, insertNewUser, insertNewSession, getSessionById } from "../repository/auth.repository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export async function signup(req, res){
    const {username, email, password, pictureUrl} = req.body;

    try{
        const registeredUser = await getUserByEmail(email)

        if(registeredUser.rows.length !== 0){
            res.sendStatus(409)
            return
        }

        const encryptedPassword = bcrypt.hashSync(password, 10);

        await insertNewUser(username, email, encryptedPassword, pictureUrl)

        res.sendStatus(201)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function signin(req, res){
    const {email, password} = req.body;

    try{
        const user = await getUserByEmail(email)

        if(user.rows.length === 0 || !bcrypt.compareSync(password, user.rows[0].password)){
            res.sendStatus(401)
            return
        }

        const session = await getSessionById(user.rows[0].id);

        if(session.rows.length !== 0){
            res.send(session.rows[0].token).status(200);
            return
        }

        const token = uuid();

        await insertNewSession(user.rows[0].id, token)
    
        res.send({token}).status(200);
        
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

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