
import {
  Box,
  Container,
  Text,
  Heading
} from '@chakra-ui/react'
import { Flex } from '@chakra-ui/layout'

export default function Home() {
  return (

      <Box>
        <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1000px', 
          marginTop: '100px'
        }}
        >
          <Heading size='2xl' fontWeight='bold'>This is our CRUD app.</Heading>
        </Container>
      </Box>



  )
}
