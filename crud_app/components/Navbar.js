import NextLink from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

import { 
    Box,
    Heading,
    Container,
    IconButton,
    Text,
    Link,
    Flex, 
    useColorModeValue,
    useColorMode

} from '@chakra-ui/react'
import {
    MoonIcon,
    SunIcon
} from '@chakra-ui/icons'

const LinkItem = ({ path, href, children }) => {

    const active = path === href


    return (
        <NextLink href={href}>
            <Link
            p={2}
            bg={active ? 'blue' : null}
            color={useColorModeValue('black', 'white')}
            style={{
                textDecoration: 'none'
            }}
            >
                {children}
            </Link>
        </NextLink>

    )


}


const ThemeToggleButton = () => {
    const { toggleColorMode } = useColorMode()

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div style={{display: 'inline-block'}} 
        key={useColorModeValue('light', 'dark')} 
        initial={{y: -20, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        exit={{y: 20, opacity: 0}}
        transition={{ duration: 0.2}}
        >
        <IconButton aria-label='Toggle theme'
        
        colorScheme={useColorModeValue('purple', 'orange')}
        icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
        onClick={toggleColorMode}></IconButton>
        </motion.div>
        </AnimatePresence>
    )
}



const Navbar = props => {
    const { path } = props

    return (
        <>
            <Flex
            h='80px'
            bg={useColorModeValue('gray.300', 'gray.700')}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: '15px',
                paddingLeft: '15px'
            }}
            >
                <Container p={0} m={0} >
                    <NextLink href='/' style={{ textDecoration: 'none', cursor: 'pointer'}}>
                    <Heading size='xl' fontWeight='bold' color={'teal'} style={{ cursor: 'pointer'}}>
                        CRUD
                    </Heading>
                    </NextLink>
                </Container>

                <Flex g={2}>
                    <LinkItem path={path} href='/add-post'>
                        Add Post
                    </LinkItem>
                </Flex>


                <Flex>
                    <ThemeToggleButton />
                </Flex>

            </Flex>
        </>
    )
}

export  default Navbar