import Form from '../components/Form'

const NewPost = () => {
    const postForm = {
        title: '',
        description: ''
    }

    return <Form formId='add-post-form' postForm={postForm} />
}

export default NewPost