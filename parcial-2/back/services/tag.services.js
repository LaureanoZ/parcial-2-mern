import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("AH20231CP1")

async function getTag(filter = {}) {
    await client.connect()

    const filterTag = {}
    if (filter?.section) {
        filterTag.$text = {$search: filter.section}
    }

    if (filter?.technologies) {
        filterTag.technologies = { $all: filter.technologies.split(";") }
    }


    return db.collection("Tags").find(filterTag).toArray()
}

async function createTag(tag) {
    await client.connect()
    await db.collection("Tags").insertOne(tag)
    return tag
}

async function editTag(idTag, tag) {
    await client.connect()
    await db.collection("Tags").updateOne({ _id: new ObjectId(idTag) }, { $set: tag })
    return tag
}

async function deleteTag(idTag) {
    await client.connect()
    await db.collection("Tags").deleteOne({ _id: new ObjectId(idTag) })

    return {
        id: idTag
    }
}

export {
    getTag,
    createTag,
    editTag,
    deleteTag,
}