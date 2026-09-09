const express = require('express')
const router = express.Router()

// Temporär "databas", ersätts senare med riktig DB
const tempData = [
    { "text": "Hello" },
    { "text": "morjens" }
]

router.get('/', (req, res) => {
    res.send(tempData)
})

module.exports = router