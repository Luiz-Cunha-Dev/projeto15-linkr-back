import { connection } from "../database/db.js";

export function getUserByEmail(email){
    return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

export function insertNewUser(username, email, encryptedPassword, pictureUrl){
    return connection.query(`INSERT INTO users (username, email, password, "pictureUrl") VALUES ($1, $2, $3, $4)`, [username, email, encryptedPassword], pictureUrl);
}

export function insertNewSession(userId, token){
    return connection.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [userId, token]);
}

export function getSessionByToken(token){
    return connection.query("SELECT * FROM sessions WHERE token = $1", [token])
}

export function getSessionById(id){
    return connection.query(`SELECT * FROM sessions WHERE "userId" = $1`, [id])
}

export function deleteSession(userId){
    return connection.query(`DELETE FROM sessions WHERE "userId" = $1`, [userId])
}