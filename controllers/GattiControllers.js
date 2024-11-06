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

const update = (req, res) => {

    const gatto = gatti.find((gatto) => gatto.nome.toLowerCase() === req.params.nome)

    // check if the user is updating the correct pizza
    if (!gatto) {
        return res.status(404).json({ error: 'No gatto for name' })
    }

    // update the pizza object
    gatto.nome = req.body.nome;
    gatto.colore = req.body.colore
    gatto.eta = req.body.eta


    // update the js file
    fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(gatti, null, 4)}`)

    // return the updated menu item
    res.status(200).json({
        status: 200,
        data: gatti
    })

}

const destroy = (req, res) => {
    // find the pizza by id
    const gatto = gatti.find((gatto) => gatto.nome.toLowerCase() === req.params.nome)

    // check if the user is updating the correct pizza
    if (!gatto) {
        return res.status(404).json({ error: 'No gatto foud for nome' })
    }

    // remove the pizza from the menu
    const newGatto = gatti.filter((gatto) => gatto.nome.toLowerCase() !== req.params.nome)

    // update the js file
    fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(newGatto, null, 4)}`)

    // return the updated menu item
res.status(200).json({
    status: 200,
    data: newGatto
})
}


module.exports = {
    index,
    show,
    store,
    update,
    destroy
}