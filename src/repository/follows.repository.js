import { connection } from "../database/db.js";

export function getFollowById(id, userId){
    return connection.query(`SELECT * FROM follows WHERE "userId" = $1 AND "followerId" = $2`, [id, userId])
}

export function addFollower(id, userId){
    return connection.query(`INSERT INTO follows ("userId", "followerId") VALUES ($1, $2)`, [id, userId])
}

export function deleteFollower(id, userId){
    return connection.query(`DELETE FROM follows WHERE "userId" = $1 AND "followerId" = $2`, [id, userId])
}

export function getSessionByToken(token){
    return connection.query("SELECT * FROM sessions WHERE token = $1", [token])
}
