import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import dbConnect from '../../lib/dbConnect'
import Post from '../../models/Post'

import { 
    Box, 
    Heading, 
    Text, 
    Button,
    Flex,

} from '@chakra-ui/react'

// Allows you to view Post and delete Post
const PostPage = ({ post }) => {
    const router = useRouter()
    const [message, setMessage] = useState('')


    const handleDelete = async () => {
        const postID = router.query.id 

        console.log(postID)
        
        try {
            await fetch(`/api/posts/${postID}`, {
                method: 'Delete'
            })

            router.push('/')

        } catch (error) {
            setMessage('Failed to delete the post.')
        }
    }


    return (
        
        <Box key={post._id}>
            <Flex style={{ flexDirection: 'column' }} gap={2}>
                <Heading size='lg' as='h2'>Title: {post.title}</Heading>
                <Text>{post.description}</Text>
                <Flex gap={2}>
                    <Link href='/[id]/edit' as={`/${post._id}/edit`}>
                        <Button colorScheme='blue'>Edit</Button>
                    </Link>
                        <Button colorScheme='pink' onClick={handleDelete}>Delete</Button>
                </Flex>
            </Flex>
            {message && <Text>{message}</Text>}
        </Box>
    )

}


export async function getServerSideProps({ params }) {
    await dbConnect()
    
    const post = await Post.findById(params.id).lean()
    post._id = post._id.toString()
    
    return { props: { post } }
}

export default PostPage