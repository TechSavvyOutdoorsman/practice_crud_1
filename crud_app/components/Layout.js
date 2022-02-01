import Head from 'next/head'
import Navbar from './Navbar'
import {
    Container,
    Box, 
    Heading,
} from '@chakra-ui/react'


const Layout = ({ children, router }) => {


    return (
        <>
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <title>CRUD APP</title>
            <link rel='shortcut icon' href='/public/vercel.svg' />
        </Head>

        <>
        <Navbar path={router.asPath} />
            {children}

        </>


        </>
    )
}

export default Layout