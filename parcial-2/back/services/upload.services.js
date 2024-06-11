import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("AH20231CP1")

async function getUpload(filter = {}) {
    await client.connect()

    const filterUpload = {}
    if (filter?.section) {
        filterUpload.$text = {$search: filter.section}
    }

    if (filter?.technologies) {
        filterUpload.technologies = { $all: filter.technologies.split(";") }
    }


    return db.collection("Uploads").find(filterUpload).toArray()
}

async function createUpload(upload) {
    await client.connect()
    await db.collection("Uploads").insertOne(upload)
    return upload
}

async function editUpload(idUpload, upload) {
    await client.connect()
    await db.collection("Uploads").updateOne({ _id: new ObjectId(idUpload) }, { $set: upload })
    return upload
}

async function deleteUpload(idUpload) {
    await client.connect()
    await db.collection("Uploads").deleteOne({ _id: new ObjectId(idUpload) })

    return {
        id: idUpload
    }
}

export {
    getUpload,
    createUpload,
    editUpload,
    deleteUpload,
}