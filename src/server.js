const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 8080

console.log(`Node.js ${process.version}`)


app.use(express.json())

app.use(cors({
    origin: [ 
        'http://people.arcada.fi',
        'https://people.arcada.fi'
    ]
}))

app.get('/', (req, res) => {
    res.json({ msg: "CORS test", version: "0.7" })
})

const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)



app.listen(PORT, () => {
    try {
        console.log(`Running on http://localhost:${PORT}`)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    
})
