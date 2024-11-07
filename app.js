const express = require('express')
const app = express()
const gattiRoutes = require('./routes/gatti.js')
const notFoundMiddleware = require('./middlewares/not found.js')
const loggerMiddleware = require('./middlewares/loggerMiddleware.js')
app.use(express.json())

const HOST = process.env.HOST
const PORT = process.env.PORT

app.listen(3000, () => {
    console.log(`Server is runnig at ${HOST}:${PORT}`);
})


    
app.use('/gatti', (req, res, next) => {
    throw new Error('Tou broken everything dude!')
})



app.use('/gatti', loggerMiddleware)

app.use('/gatti', gattiRoutes)

app.use(notFoundMiddleware)

app.use((err, req, res, next) => {
    console.log("Error: ", err.message);
    // this prints the stack trace of the error
    console.error(err.stack);
    res.status(500).send({
      message: "Something went wrong",
      error: err.message
    })
  });