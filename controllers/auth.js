const CustomError = require("../utils/CustomError")
const Patient = require("../models/patientModel")
const User = require("../models/userModel")


// @desc        Create a new user
// @route       POST /api/v1/auth/register
// @access      doctor, staff

exports.register = async (req, res, next) => {
    const { name, email, password, role } = req.body

    try {
        let user = await User.findOne({ email })

        if (user) {
            return next(
                new CustomError('User already exist with that email', 403)
            )
        }

        user = await User.create({
            name,
            email,
            password,
            role
        })

        const token = user.getSignedJwtToken();

        res.status(201).json({ success: true, token })

    } catch (err) {
        next(err)
    }
}


// @desc        Login a new user
// @route       POST /api/v1/auth/login
// @access      doctor, staff

exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(
            new CustomError('Please provide email and password', 400)
        )
    }

    try {
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return next(
                new CustomError('Invalid credientials', 401)
            )
        }

        //check if user password matches
        const isMatch = await user.matchPassword(password, user.password)

        if (!isMatch) {
            return next(
                new CustomError('Invalid credientials', 401)
            )
        }


        sendTokenResponse(user, 201, res)

    } catch (err) {
        next(err)
    }
}

//get token from model, create cookie and send response

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token })
}

// @desc        Get a logged in user
// @route       GET /api/v1/auth/me
// @access      private

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        res.status(200).json({ success: true, data: user })
    } catch (err) {
        next(err)
    }
}

