import { connectToDatabase } from '../../util/mongodb'
import {
    Box,  
    Heading, 
    Text,
} from '@chakra-ui/react'


export const getStaticPaths = async () => {
    // const res = await fetch(`https:/localhost:3000/api/posts`)
    // const data = await res.json()

    const { db } = await connectToDatabase()

    const data = await db.collection('posts').find({}).toArray()
  
    const posts = JSON.parse(JSON.stringify(data))


    const paths =  posts.map(post => {
        return {
            params: { id: post._id.toString() }
        }
    })
    

    return {
        paths, 
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id

    const { db } = await connectToDatabase()

    const data = await db.collection('posts').findOne(objectId(id)).toArray()
    
    const posts = JSON.parse(JSON.stringify(data))

    return {

      props: {
         post: posts  
      }
    }
}

const Post = ({ post }) => {

    console.log(post)

    return  (
        <Box p={2} border='1px solid blue' borderRadius='10'>
            <Heading size='lg'>Title: { post.title }</Heading>
            <Text mt={3}>Description: { post.description }</Text>
        </Box>
    )
}

export default Post