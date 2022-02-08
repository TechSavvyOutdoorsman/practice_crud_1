import { connectToDatabase } from '../../../lib/mongodb'

export default async function handler(req, res) {
    const { db } = await connectToDatabase()

    const data = req.query

   const response = await db.collection('posts').insertOne(data)

   res.json(response)
}