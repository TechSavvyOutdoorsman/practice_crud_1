import {
  Box, 
  Heading,
  Text,
  Flex,
  Button,

} from '@chakra-ui/react'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Post from '../models/Post'

export default function Home({ posts }) {

  return (
    <>
    <Box>
      <Heading size='xl'>Posts</Heading>
      {posts.map((post) => {
        return (
        <Box key={post._id}>
          <Flex border='1px solid blue' borderRadius={10} m={2} p={2}  style={{ flexDirection: 'column', alignItems: 'start', justifyContent: 'center'}} key={post._id}>
            <Heading size='md'>{post.title}</Heading>
            <Text mt={2}>{post.description}</Text>
            <Flex gap={2} mt={2}>
              <Link href='/[id]' as={`/${post._id}`}>
                <Button colorScheme='cyan'>View</Button>
              </Link>
              <Link href='/[id]/edit' as={`/${post._id}/edit`}>
                <Button colorScheme='pink' variant='ghost'>Edit</Button>
              </Link>
            </Flex>
          </Flex>
        </Box>

        )
      })}
    </Box>

    </>
  )
}

// retrieve post data from mongodb database
export async function getServerSideProps() {
  await dbConnect()

  // find all the data in our database 
  const result = await Post.find({})
  const posts = result.map((doc) => {
    const post = doc.toObject()
    post._id = post._id.toString()
    return post
  })

  return { props: { posts: posts }}
}