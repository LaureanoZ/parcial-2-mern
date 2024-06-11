import API from './api.service.upload.js'

export async function getAll() {
    return API.call({ uri: 'upload' })
}

// export async function getById(idUpload) {
//     return API.call({ uri: `upload/${idUpload}` })
// }
export async function createUpload(UploadData) {
    return API.call({ uri: `upload`, method: 'POST', body: UploadData });
}
// export async function editUpload(idUpload, UploadData) {
//     return API.call({ uri: `upload/${idUpload}`, method: 'PATCH', body: UploadData })
// }
export async function deleteUpload(idUpload) {
    return API.call({ uri: `upload/${idUpload}`, method: 'DELETE'})
}

export default {
    getAll,
    deleteUpload,
}