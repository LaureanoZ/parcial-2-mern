import * as service from '../../services/tag.services.js'

function getTag(req, res) {
    const filter = req.query
    service.getTag(filter)
        .then(function (data) {
            res.status(200).json(data)
        })
}

function createTag(req, res) {
    const tag = {
        name: req.body.name,
        user: req.body.user,
    }

    service.createTag(tag)
        .then(function (tag) {
            res.status(201).json(tag)
        })
}
function replaceTag(req, res) {
    const idTag = req.params.idTag

    const tag = {
        name: req.body.name,
        user: req.body.user,
    }
    service.editTag(idTag, tag)
        .then(function (tag) {
            if (tag) {
                res.status(200).json(tag)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el tag #${idTag}` } })
            }
        })

}
function updateTag(req, res) {
    const idTag = req.params.idTag

    const tag = {}

    if (req.body.name) {
        tag.name = req.body.name
    }
    if (req.body.user) {
        tag.user = req.body.user
    }


    service.editTag(idTag, tag)
        .then(function (tag) {
            if (tag) {
                res.status(200).json(tag)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el tag #${idTag}` } })
            }
        })

}
function deleteTag(req, res) {
    const idTag = req.params.idTag

    service.deleteTag(idTag)
        .then(function (Tag) {
            if (Tag) {
                res.status(200).json(Tag)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el tag #${idTag}` } })
            }
        })
}

export {
    getTag,
    createTag,
    replaceTag,
    updateTag,
    deleteTag
}