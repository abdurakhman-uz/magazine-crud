const jwt = require("jsonwebtoken")
const {read, write} = require("../utils/read")

const { SECRET_KEY } = process.env


module.exports = function (req, res, next) {
    const {token} = req.headers
    if (req.headers.token) {
        try {
            let userInfo = jwt.verify(token, SECRET_KEY)


            let userInfoArr = read('jwt')
            userInfoArr[0] = userInfo
            write("jwt", userInfoArr)
            return next()


        } catch (error) {
            res.send({code: 1, msg: "Token experied!"})
            console.log(error);
        }
    } else if (req.url === "/all_products") {
        const products = read("products")
        res.send(products)
    } else {
        return res.send({msg: 'Token required!'})
    }

}
