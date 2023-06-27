import API from './api.service'

export async function getAll() {
    return API.call({ uri: 'data' })
}

export async function getById(idProject) {
    return API.call({ uri: `data/${idProject}` })
}
export async function createProject(projectData) {
    return API.call({ uri: `data`, method: 'POST', body: projectData });
}
export async function editProject(idProject, projectData) {
    return API.call({ uri: `data/${idProject}`, method: 'PATCH', body: projectData })
}
export async function deleteProject(idProject) {
    return API.call({ uri: `data/${idProject}`, method: 'DELETE'})
}

export default {
    getAll,
    getById,
    createProject,
    editProject
}