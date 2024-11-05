const gatti = require('../database/db.js')
const fs = require('fs')

const index = (req, res) => {
    res.json({
        data: gatti,
        counter: gatti.length
    })
}
const show = (req, res) => {

    const gatto = gatti.find((gatto) => gatto.nome.toLowerCase() === req.params.nome)
    if (!gatto) {
        return res.status(404).json({ error: `Nessun gatto presente con il nome cercato: ${req.params.nome}` })
    }
    return res.status(200).json({ data: gatto })
}


const store = (req, res) => {


    const gatto = {
        nome: req.body.nome,
        colore: req.body.colore,
        eta: req.body.eta
    }

     gatti.push(gatto)

     fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(gatti, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: gatti,
        counter: gatti.length
    })
}




module.exports = {
    index,
    show,
    store
}