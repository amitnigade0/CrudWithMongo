const bcrypt = require('bcrypt')
const User = require("../models/userModel");
const jwt = require('jsonwebtoken')
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler (async (req, res) => {
    const { email, username, password } = req.body;
    if(!email || !username || !password) {
        res.status(400);
        throw new Error('Bad request')
    } 
    // check user exist
    const user = await User.findOne({email})
    if (user) {
        res.status(400);
        throw new Error('User already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const registerUser = await User.create({
        email, username, password: hashedPassword
    })
    if (!registerUser) {
        res.status(400);
        throw new Error('User data invalid')
    }
    res.json({ message: `register ${username} successfully`  })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error('All fields are mandatory!')
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(404)
        throw new Error('User not found, please register')
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (user && isValidPassword) {
        const accessToken = jwt.sign({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            }
        }, process.env.SECRET_KEY, { expiresIn: '30m' })
        res.json({ token:  accessToken })
    } else {
        res.status(401);
        throw new Error('Email & password does not match')
    }

})

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }