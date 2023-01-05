import { connection } from "../database/db.js";


export function getSessionByToken(token){
    return connection.query("SELECT * FROM sessions WHERE token = $1", [token])
}

export function deleteSession(userId){
    return connection.query(`DELETE FROM sessions WHERE "userId" = $1`, [userId])
}