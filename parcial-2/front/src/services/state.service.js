import API from './api.service'

export async function getAll() {
    return API.call({ uri: 'state' })
}

export async function getById(idState) {
    return API.call({ uri: `state/${idState}` })
}
export async function createState(stateData) {
    return API.call({ uri: `state`, method: 'POST', body: stateData });
}
export async function editState(idState, stateData) {
    return API.call({ uri: `state/${idState}`, method: 'PATCH', body: stateData })
}
export async function deleteState(idState) {
    return API.call({ uri: `state/${idState}`, method: 'DELETE'})
}

export default {
    getAll,
    getById,
    createState,
    editState
}