import { useRef, useEffect, useState } from 'react'
import NextLink from 'next/link'
import {
    Container, 
    Box,
    Flex,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react'


const Navbar = props => {

    const { path } = props 
    const btnRef = useRef()

    return (

        <h2>Nav</h2>
    )
}

export default Navbar
