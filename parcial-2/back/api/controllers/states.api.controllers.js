import * as service from '../../services/state.services.js'

function getState(req, res) {
    const filter = req.query
    service.getState(filter)
        .then(function (data) {
            res.status(200).json(data)
        })
}

function createState(req, res) {
    const state = {
        name: req.body.name,
        color: req.body.color,
    }

    service.createState(state)
        .then(function (state) {
            res.status(201).json(state)
        })
}
function replaceState(req, res) {
    const idState = req.params.idState

    const state = {
        name: req.body.name,
        color: req.body.color,
    }
    service.editState(idState, state)
        .then(function (state) {
            if (state) {
                res.status(200).json(state)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el state #${idState}` } })
            }
        })

}
function updateState(req, res) {
    const idState = req.params.idState

    const state = {}

    if (req.body.name) {
        state.name = req.body.name
    }
    if (req.body.color) {
        state.color = req.body.color
    }


    service.editState(idState, state)
        .then(function (state) {
            if (state) {
                res.status(200).json(state)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el state #${idState}` } })
            }
        })

}
function deleteState(req, res) {
    const idState = req.params.idState

    service.deleteState(idState)
        .then(function (State) {
            if (State) {
                res.status(200).json(State)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el State #${idState}` } })
            }
        })
}

export {
    getState,
    createState,
    replaceState,
    updateState,
    deleteState
}