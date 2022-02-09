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
            params: { id: post.id.toString() }
        }
    })
    
    return {
        paths, 
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    // const res = await fetch('https://localhost:3000/api/posts/' + id)
    // const data = res.json()

    const { db } = await connectToDatabase()

    const data = await db.collection('posts').findOne({"_id": id}).toArray()
  
    const post = JSON.parse(JSON.stringify(data))


  
    return {
      props: {
        post: post
      }
    }
}

const Post = ({ post }) => {
    return  (
        <Box>
            <Heading size='lg'>{post.title}</Heading>
            <Text>{post.description}</Text>
        </Box>
    )
}

export default Post