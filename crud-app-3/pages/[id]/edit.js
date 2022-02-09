import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/Form'
import {
    Box, 
    Heading,
    Text,
    Button,
    Flex
} from '@chakra-ui/react'

const fetcher = (url) => 
    fetch(url)
        .then((res) => res.json())
        .then((json) => json.data)

const EditPost = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: post, error } = useSWR(id ? `/api/posts/${id}` : null, fetcher)


    if (error) return <Text>Failed to load</Text>
    if (!post) return <Text>Loading...</Text>

    const postForm = { 
        title: post.title,
        description: post.description
    }

    return (
        <Box align='center'>
            <Heading size='lg' as='h2'>Edit a Page</Heading>

            <Flex>
                <Form formId='edit-post-form' postForm={postForm} forNewPost={false} />
            </Flex>
        </Box>



    )
}

export default EditPost