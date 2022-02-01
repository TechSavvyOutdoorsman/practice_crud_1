import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider>
    
    <Layout router={router}>
      <Component {...pageProps} />
    </Layout>
    </ChakraProvider>
  ) 
  
}

export default MyApp
