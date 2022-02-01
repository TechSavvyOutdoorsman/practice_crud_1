
import PostCard from '../components/PostCard'
import {
  Box,
  Container,
  Text,
  Heading
} from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'

export default function Home({ posts }) {
  return (

      <Box>
        <Container>
          {posts.length === 0 ? (
            <Text size='md'>No added posts</Text>
          ) : (
            <ul>
              {posts.map((post, i) => (
                <PostCard post={post} key={i} />
              ))}
            </ul>
          )}
        </Container>


      </Box>



  )
}


export async function getServerSideProps(context) {
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production'
  let { DEV_URL, PROD_URL } = process.env
  
  // request posts from api
  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`)
  // extract the data
  let data = await response.json()



  return {
    props: {
      posts: data['message'],
    }
  }

}
