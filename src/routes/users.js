const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')  // object destructuring
const bcrypt = require('bcrypt')
const authorize = require('../middleware/authorize')

const prisma = new PrismaClient()

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