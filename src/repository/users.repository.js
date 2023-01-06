import { connection } from "../database/db.js";


export function getSessionByToken(token){
    return connection.query("SELECT * FROM sessions WHERE token = $1", [token])
}

export function getUsersByName(name){
    return connection.query(`SELECT id, username, "pictureUrl" FROM users WHERE username like $1`, [`${name}%`])
}

export function getPostById(id){
    return connection.query(`SELECT * FROM posts WHERE "userId" = $1`, [id])
}

export function getUserbyId(id){
    return connection.query(`SELECT username, "pictureUrl" FROM users WHERE id = $1`, [id])
}


