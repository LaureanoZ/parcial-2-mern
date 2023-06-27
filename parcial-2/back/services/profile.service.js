import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("AH20231CP1")
const profilesCollection = db.collection('profiles')

async function createProfile(account, profile) {
    const newProfile = {
        ...profile,
        userName: account.userName,
        _id: new ObjectId(account._id)
    }
    await client.connect()

    const exist = await profilesCollection.findOne({ _id: new ObjectId(newProfile._id) })

    if (exist) {
        throw new Error("Esta cuenta ya tiene un perfil asociado.")
    }

    await profilesCollection.insertOne(newProfile)
}

async function getProfile(idProfile) {
    await client.connect()

    const profile = await profilesCollection.findOne({ _id: new ObjectId(idProfile) })

    if (!profile) {
        throw new Error("Esta cuenta no tiene un perfil asociado.")
    }

    return profile
}

async function editProfile(idProfile, profile) {
    await client.connect()
    await db.collection("profiles").updateOne({ _id: new ObjectId(idProfile) }, { $set: profile })
    return profile
}

export {
    createProfile,
    getProfile,
    editProfile
}


