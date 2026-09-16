const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', (req, res) => {
    res.send("...")
})

router.post('/', async (req, res) => {
    console.log(req.body)
    
    const note = await prisma.notes.create({
        data: { 
            author_id: 1, 
            note: req.body.note 
        }
    })
    
    res.send({
        msg: "Note created", 
        id: note.id
    })
})

/*
router.put('/:id', (req, res) => {
    console.log(`PATCH ${req.params.id}`)
    // TEMP, ersätts med DB
    tempData[req.params.id-1] = req.body
    res.send({
        msg: "Note updated", 
        id: req.params.id,
        newNote: tempData[req.params.id-1]
    })
})

router.delete('/:id', (req, res) => {
    // TEMP, ersätts med DB
    tempData.splice(req.params.id-1)

    res.send({
        msg: "Note deleted", 
        id: req.params.id
    })
})
*/

module.exports = router