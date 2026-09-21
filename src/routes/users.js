const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')  // object destructuring
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authorize = require('../middleware/authorize')

const prisma = new PrismaClient()

router.post('/login', async (req, res) => {

    const regUser = await prisma.users.findUnique({
        where: {  email: req.body.email }
    })
    
    if (regUser === null) {
        console.log(`user not found`)
        return res.status(401).send({msg: "Authentication failed"})
    }

    const match = await bcrypt.compare(req.body.password, regUser.password)
    
    if (!match) {
        console.log(`wrong password`)
        return res.status(401).send({msg: "Authentication failed"})
    }

    const token = await jwt.sign({
        sub: regUser.id,
        email: regUser.email,
        name: regUser.name
    }, process.env.JWT_SECRET, {expiresIn: '30d'})

    res.send({
        msg: "Login success!", 
        id: regUser.id,
        jwt: token
    })
})


router.post('/', async (req, res) => {
    console.log(req.body)

    const hashPass = await bcrypt.hash(req.body.password, 10)
    
    const user = await prisma.users.create({
        data: { 
            email: req.body.email,
            password: hashPass,
            name: req.body.name
        }
    })
    
    res.send({
        msg: "User created", 
        id: user.id
    })
})

module.exports = router