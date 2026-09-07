const express = require('express');
const logRequest = require('./middleware/log-request')
const capitalize = require('./middleware/capitalize')

const app = express();

const PORT = 3000;

// middleware
app.use(logRequest);

app.get('/', (req, res) => {
    res.send("Hello express!");
});

/* flytta till middleware-foldern
const capitalize = (req, res, next) => {
    req.originalName = req.params.name;
    req.params.name = req.params.name.toUpperCase();
    next();
}*/

/**
 * Code challenge:
 */
app.get('/hello/:name', capitalize, (req, res) => {
    console.log(req.params);
    res.send(`
        Hello ${req.params.name} 
        (original: ${req.originalName})
    `);
});

app.get('/weekdays/:wd', (req, res) => {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    res.send(weekdays[req.params.wd-1])
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});