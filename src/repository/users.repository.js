import { connection } from "../database/db.js";


export function getSessionByToken(token){
    return connection.query("SELECT * FROM sessions WHERE token = $1", [token])
}

export function getUsersByName(name){
    return connection.query(`SELECT id, username, "pictureUrl" FROM users WHERE username like $1`, [`${name}%`])
}