import { connectToDatabase } from '../util/mongodb'
import Link from 'next/link'
import {
  Box,
  Container,
  Text,
  Button,
  Heading,
  Flex,

} from '@chakra-ui/react'
import { resolveHref } from 'next/dist/shared/lib/router/router'



export default function Home({ posts }) {


  return (
      <Box maxW='container.md' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <Container align='center' mb={5} p={2}>
            <Heading size='lg'>Posts</Heading>
        </Container>

        <Flex flexDir='column' gap={5}>
        {posts && posts.map(post=> {
          return (
            <Box maxW='300px' key={post._id}  borderRadius={10} p={2} border='1px solid pink' style={{ display: 'flex', alignItems: 'left', justifyItems: 'start', flexDirection: 'column'}}>
              <Heading mb={2} size='md'>{post.title}</Heading>
              <Text size='sm'>{post.description}</Text>
              <Flex mt={2} gap={2}>
              <Link href={`/posts/${post._id}`}>
                <Button colorScheme='cyan' >View</Button>
              </Link>
                <Button colorScheme='pink' variant='ghost' onClick={''} >Edit</Button>
              </Flex>
            </Box>

          )
        })}          

        </Flex>
      </Box>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase()

  const data = await db.collection('posts').find({}).toArray()

  const posts = JSON.parse(JSON.stringify(data))

  return {
    props: {
      posts: posts
    }
  }
}