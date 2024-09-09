import jwt from 'jsonwebtoken';

function createToken(user, time, expires, secret){
    let data = {
        time: time,
        data: user,
        expiresIn: expires
    }

    let token = jwt.sign(data, secret, {
        expiresIn: expires
    })

    return token
}


export default createToken
