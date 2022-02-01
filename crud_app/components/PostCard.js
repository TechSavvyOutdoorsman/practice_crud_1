import { useState } from 'react'
import { useRouter } from 'next/router'
import {
    Button, 
    Container,
    Box,
    Heading,
    Text
} from '@chakra-ui/react'




export default function PostCard({ post }) {
    const [publishing, setPublishing] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const router = useRouter()


    //Publish Post

    const publishPost = async (postId) => {
        setPublishing(true)

        try {
            await fetch('/api/posts', {
                method: 'PUT',
                body: postId,
            })

            // reset the publishing state
            setPublishing(false)

            // reload the page
            return router.push(router.asPath)
        } catch (error) {
            return setPublishing(false)
        }
    }


    // Delete Post
    const deletePost = async (postId) => {

        // change  deleting state

        setDeleting(true)

        try {
            await fetch('/api/posts', {
                method: 'DELETE',
                body: postId,
            })

            // reset the deleting state
            setDeleting(false)

            // reload the page
            return router.push(router.asPath)
        } catch (error) {

            //stop deleting state
            return setDeleting(false)
        }
    }


    return (
        <>
            <li>
                <Heading >{post.title}</Heading>
                <Text>{post.content}</Text>
                <small>{new Date(post.createdAt).toLocaleDateString()}</small>
                <br />
                {!post.published ? (
                    <Button colorScheme='teal' style={{ marginRight: '5px'}} type="button" onClick={() => publishPost(post._id)}>
                        {publishing ? 'Publishing' : 'Publish'}
                    </Button>
                ) : null}
                <Button colorScheme='red' type="button" onClick={() => deletePost(post['_id'])}>
                    {deleting ? 'Deleting' : 'Delete'}
                </Button>
            </li>
        </>
    )
}