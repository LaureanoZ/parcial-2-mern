import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("AH20231CP1")

async function getState(filter = {}) {
    await client.connect()

    const filterState = {}
    if (filter?.section) {
        filterState.$text = {$search: filter.section}
    }

    if (filter?.technologies) {
        filterState.technologies = { $all: filter.technologies.split(";") }
    }


    return db.collection("States").find(filterState).toArray()
}

async function createState(state) {
    await client.connect()
    await db.collection("States").insertOne(state)
    return state
}

async function editState(idState, state) {
    await client.connect()
    await db.collection("States").updateOne({ _id: new ObjectId(idState) }, { $set: state })
    return state
}

async function deleteState(idState) {
    await client.connect()
    await db.collection("States").deleteOne({ _id: new ObjectId(idState) })

    return {
        id: idState
    }
}

export {
    getState,
    createState,
    editState,
    deleteState,
}