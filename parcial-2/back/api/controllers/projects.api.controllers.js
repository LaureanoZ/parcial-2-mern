import * as service from '../../services/web.services.js'

function getData(req, res) {
    const filter = req.query
    service.getData(filter)
        .then(function (data) {
            res.status(200).json(data)
        })
}

function createProject(req, res) {
    const project = {
        name: req.body.name,
        description: req.body.description,
        comment: req.body.comment,
        state: req.body.state,
        user: req.body.user,
        tags: req.body.tags,
        userId: req.body.userId,
    }

    service.createProject(project)
        .then(function (project) {
            res.status(201).json(project)
        })
}
async function getProjectById(req, res) {
    const idProject = req.params.idProject;

    try {
        const project = await service.getProjectById(idProject);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ error: { message: `No se encuentra el proyecto #${idProject}` } });
        }
    } catch (error) {
        res.status(500).json({ error: { message: 'Error al obtener el proyecto por ID' } });
    }
}
function replaceProject(req, res) {
    const idProject = req.params.idProject

    const project = {
        name: req.body.name,
        description: req.body.description,
        comment: req.body.comment,
        state: req.body.state,
        user: req.body.user,
        tags: req.body.tags,
        userId: req.body.userId,
    }
    service.editProject(idProject, project)
        .then(function (project) {
            if (project) {
                res.status(200).json(project)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el projecto #${idProject}` } })
            }
        })

}
function updateProject(req, res) {
    const idProject = req.params.idProject

    const project = {}

    if (req.body.name) {
        project.name = req.body.name
    }
    if (req.body.description) {
        project.description = req.body.description
    }
    if (req.body.comment) {
        project.comment = req.body.comment
    }
    if (req.body.state) {
        project.state = req.body.state
    }
    if (req.body.user) {
        project.user = req.body.user
    }
    if (req.body.tags) {
        project.tags = req.body.tags
    }
    if (req.body.userId) {
        project.userId = req.body.userId
    }

    service.editProject(idProject, project)
        .then(function (project) {
            if (project) {
                res.status(200).json(project)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el projecto #${idProject}` } })
            }
        })

}
function deleteProject(req, res) {
    const idProject = req.params.idProject

    service.deleteProject(idProject)
        .then(function (project) {
            if (project) {
                res.status(200).json(project)
            }
            else {
                res.status(404).json({ error: { message: `No se encuentra el projecto #${idProject}` } })
            }
        })
}

export {
    getData,
    createProject,
    getProjectById,
    replaceProject,
    updateProject,
    deleteProject
}