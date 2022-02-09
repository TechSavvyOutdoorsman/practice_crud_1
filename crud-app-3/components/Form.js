import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate }  from 'swr'

import {
    Box, 
    Heading, 
    Text,
    Button,
    FormControl,
    Input,
    FormLabel,
    FormErrorMessage,

} from '@chakra-ui/react'

const Form = ({ formId, postForm, forNewPost = true }) => {
    const router = useRouter()
    const contentType = 'application/json'
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState('')

    const [form, setForm] = useState({
        title: postForm.title,
        description: postForm.description
    })

    // The PUT method edits an existing entry in the mongodb database
    const putData = async (form) => {
        const { id } = router.query

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                header: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            const { data } = await res.json()

            // const { mutate } = useSWR(`/api/posts/${id}`, data)

            await mutate(`/api/posts/${id}`, data, false) // update the local data without a revalidation
        
            router.push('/')
        } catch (error) {
            setMessage('Failed to update post')
        }
    }

    // the POST method adds a new entry in the mongodb database 
    const postData = async (form) => {
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                }, 
                body: JSON.stringify(form),
            })

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status)
            }

            router.push('/')
        } catch (error) {
            setMessage('Failed to add post')
        }
    }

    const handleChange = (e) => {
        const target = e.target
        const value =
          target.name === 'poddy_trained' ? target.checked : target.value
        const name = target.name
        

        setForm({
           ...form,
           [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = formValidate()
        if (Object.keys(errs).length === 0) {
            // forNewPost ? postData(form) : putData(form)
            putData(form)
        } else {
            setErrors({ errs })
        }
    }

    // Make sure that title and description are filled in
    const formValidate = () => {
        let err = {}
            if (!form.title) err.title = 'Title is required'
            if (!form.description) err.description = 'Description is required'
        return err 
    }


    return (
        <Box>
            <form onSubmit={handleSubmit} id={formId}>
                <FormControl>
                    <FormLabel htmlFor='title' >Title</FormLabel>
                    <Input
                        type='text'
                        maxLength='30'
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <FormLabel htmlFor='description'>Description</FormLabel>
                    <Input
                        type='text'
                        maxLength='400'
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                        required
                    />

                    <FormErrorMessage>{message}</FormErrorMessage>
                    <Button type='submit' colorScheme='cyan'>
                        Submit
                    </Button>
                </FormControl>
            </form>

            <Box>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </Box>
        </Box>
    )
}

export default Form 