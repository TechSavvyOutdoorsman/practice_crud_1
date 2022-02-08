import { connectToDatabase } from '../../util/mongodb'

export default async function handler(req, res) {
    const { db } = await connectToDatabase()

    const data = await db.collection('posts').find({}).toArray()

    // optional way to connect to a particular database, in this case 'posts' 
    // db = client.db('posts')

    res.json(data)
}