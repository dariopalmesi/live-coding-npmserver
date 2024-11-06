const express = require('express')
const router = express.Router()
const GattiControllers = require('../controllers/GattiControllers.js')


router.get('/', GattiControllers.index )

router.get('/:nome', GattiControllers.show)

router.post('/', GattiControllers.store)

router.put('/:nome', GattiControllers.update)

router.delete('/:nome', GattiControllers.destroy)


module.exports = router