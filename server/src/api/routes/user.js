const { Router } = require('express');
const router = Router();
const { User } = require('../database/db');
const bcrypt = require('bcrypt');
const z = require('zod');

router.post('/register', async (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;
    const findUser = await User.findOne({username: username});
    if(findUser){
        res.json({err: "User already Exists"});
    }else{
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User ({
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: hashPassword,
        });
        await newUser.save();
        res.json({msg: "User registered successfully!"});
    }
})

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const findUser = await User.findOne({username: username});
    if(!findUser){
        res.json("User does not exist!");
    }else{
        const match = await bcrypt.compare(password, findUser.password);
        if(match){
            res.json({msg: "Login Successfull"});
        }else{
            res.json({err: "Wrong Password!"});
        }
    }
})

const registerSchema = z.object({
    username: z.string().max(16).trim(),
    password: z.string().min(6),
    firstName: z.string().max(45).trim(),
    lastName: z.string().max(45).trim()
})

module.exports = router;