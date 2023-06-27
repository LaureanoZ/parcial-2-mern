import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("AH20231CP1")

async function getClient(filter = {}) {
    await client.connect()

    const filterData = {}

    if (filter?.proyectos) {
        filterData.proyectos = { $all: filter.proyectos.split(";") }
    }


    return db.collection("Client").find(filterData).toArray()
}
async function createClient(cliente) {
    await client.connect()
    await db.collection("Client").insertOne(cliente)
    return cliente
}

export {
    getClient,
    createClient,
}