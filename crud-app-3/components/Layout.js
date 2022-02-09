import Head from 'next/head'
import {
    Box, 
    Heading,
    Text
} from '@chakra-ui/react'




const Layout = ({ children }) => {

    return (
        <Box w='100%' h='100%'>
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <title>CRUD APP</title>
            </Head>
            <Box align='center'  maxW='container.lg'>
                {children}
            </Box>
        </Box>


    )
}


export default Layout