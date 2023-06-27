import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("AH20231CP1")

async function getData(filter = {}) {
    await client.connect()

    const filterData = {}
    if (filter?.section) {
        filterData.$text = {$search: filter.section}
    }

    if (filter?.technologies) {
        filterData.technologies = { $all: filter.technologies.split(";") }
    }


    return db.collection("Projects").find(filterData).toArray()
}

async function createProject(project) {
    await client.connect()
    await db.collection("Projects").insertOne(project)
    return project
}
async function getProjectById(id) {
    await client.connect()
    return db.collection("Projects").findOne({ _id: new ObjectId(id) })
}

async function editProject(idProject, project) {
    await client.connect()
    await db.collection("Projects").updateOne({ _id: new ObjectId(idProject) }, { $set: project })
    return project
}

async function deleteProject(idProject) {
    await client.connect()
    await db.collection("Projects").deleteOne({ _id: new ObjectId(idProject) })

    return {
        id: idProject
    }
}

export {
    getData,
    createProject,
    getProjectById,
    editProject,
    deleteProject,
}