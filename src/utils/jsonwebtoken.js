import jwt from 'jsonwebtoken';

const JWT_SECRET = "virtualCode";

const generatetoken = (user) =>{
    const token = jwt.sign(user, JWT_SECRET, {expiresIn:"24h"});
    return token
}

export default generatetoken;