const express = require('express')
const app = express()
const gattiRoutes = require('./routes/gatti.js')
app.use(express.json())


app.listen(3000, () => {
    console.log('Server started on port 3000');
})

app.use('/gatti', gattiRoutes)

