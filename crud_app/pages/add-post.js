import { useState } from 'react'
import {
    Box,
    Container,
    Heading,
    Button,
    Input,
    Text,
    Flex,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText
} from '@chakra-ui/react'



export default function AddPost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')


    const handlePost = async (e) => {
        e.preventDefault()

        // reset error and message
        setError('')
        setMessage('')

        // fields check
        if (!title || !content) return setError('All fields are required')

        // post structure
        let post = {
            title, 
            content,
            published: false,
            createdAt: new Date().toISOString()
        }

        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post)
        })


        // get the data
        let data = await response.json()

        if (data.success) {
            //reset the fields
            setTitle('')
            setContent('')
            // set the message 
            return setMessage(data.message)
        } else { 
            // set the error 
            return setError(data.message)
        }
    }


    return (
        <Box>
            <Container>
                <form
                onSubmit={handlePost}>

                    {error ? (
                        <Container>
                            <Heading size='lg' colorScheme={red}>{error}</Heading>
                        </Container>
                    ) : null }
                    {message ? (
                        <Container>
                            <Heading size='lg'>{message}</Heading>
                        </Container>
                    ) : null}
                    <FormLabel>
                        Title
                    </FormLabel>
                    <Input name='title' type='text' value={title} placeholder='title' onChange={(e) => setTitle(e.target.value)} />
                    <FormLabel>
                        Content
                    </FormLabel>
                    <Input name='content' type='text' value={content} placeholder='Post Content' onChange={(e) => setContent(e.target.value)} />
                    <Button variant='outline' colorScheme='teal' type='submit'>Add Post</Button>
                </form>



            </Container>
        </Box>


    )




}