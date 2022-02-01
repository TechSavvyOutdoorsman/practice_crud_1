import { useRef, useEffect, useState } from 'react'
import NextLink from 'next/link'
import {
    Container, 
    Box,
    Link,
    Flex,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react'


const LinkItem = ({ href, path, children }) => {
    const active = path === href
    const inActiveColor = useColorModeValue('grey.900', 'whiteAlpha.200')
    const activeColor = useColorModeValue('glassTeal', 'red')


    return (
        <NextLink href={href}>
            <Link 
            p={1.5}
            color={active ? activeColor : inActiveColor }
            style={{ textDecoration: 'none' }}
            >
                {children}
            </Link>
        </NextLink>
    )

}




const Navbar = props => {

    const { path } = props 
    const btnRef = useRef()

    return (

        <Box
        w='100%'
        height='80px'
        background={useColorModeValue('black', 'whiteAlpha.500')}
        >

            <Flex
            alignItems='center'
            justifyItems='center'
            >
                   <Container>
                       <LinkItem href='/' path={path}>
                           Home
                       </LinkItem>
                       <LinkItem href='/add-post' path={path}>
                           Add Post
                       </LinkItem>
                   </Container>     


            </Flex>
        


        </Box>
    )
}

export default Navbar
