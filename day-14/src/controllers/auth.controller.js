const userModel = require("../models/user.models")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

 async function registerController(req, res){
    const { username, email, password, bio, profileImage } = req.body


    // const isUserExistByEmail = await userModel.findOne({email})
    // if(isUserExistByEmail) {
    //     return res.status(409).json({
    //         message: "user already exists with same email"
    //     })
    // }

    // const isUserExistByUsername = await userModel.findOne({username})
    // if(isUserExistByUsername) {
    //     return res.status(409).json({
    //         message: "user already exists with same username"
    //     })
    // }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    // if (userAlreadyExist) {
    //     return res.status(409).json({
    //         message: "User already exists" + (isUserAlreadyExist.email == email ? "Email already exists" : "Username already exists")
    //     })
    // }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    })
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    })

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


 async function loginController(req, res) {
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {
               username: username
            },
            {
                email: email 
            }
        ]
    })
    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordValid = hash === user.password

    if(!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }       

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d"
    })      

    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: { 
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })  

    
}

module.exports = {
    registerController,
    loginController
}