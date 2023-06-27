import API from './api.service'

export async function getAll() {
    return API.call({ uri: 'tag' })
}

export async function getById(idTag) {
    return API.call({ uri: `tag/${idTag}` })
}
export async function createTag(TagData) {
    return API.call({ uri: `tag`, method: 'POST', body: TagData });
}
export async function editTag(idTag, TagData) {
    return API.call({ uri: `tag/${idTag}`, method: 'PATCH', body: TagData })
}
export async function deleteTag(idTag) {
    return API.call({ uri: `tag/${idTag}`, method: 'DELETE'})
}

export default {
    getAll,
    getById,
    createTag,
    editTag
}