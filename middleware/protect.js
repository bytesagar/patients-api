const CustomError = require("../utils/CustomError")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


//protect routes

exports.protect = async (req, res, next) => {
    try {

        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }

        // else if(req.cookies.token){
        //     token = req.cookies.token
        // }

        //token exists
        if (!token) {
            return next(
                new CustomError('Not authorized to access this route', 401)
            )
        }

        try {
            //verify token
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded);

            req.user = await User.findById(decoded.id)
            next()

        } catch (err) {
            return next(
                new CustomError('Not authorized to access this route', 401)
            )
        }

    } catch (err) {
        next(err)
    }

}