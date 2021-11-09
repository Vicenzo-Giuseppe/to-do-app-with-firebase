import { Box, Flex } from "@chakra-ui/react"
import Logo from './logo'
import Sidebar from "./sidebar"


const DashBoard = ({ email, signOut }) => {
    return (
        <Flex direction='column' h='100vh'>
            <Logo />

            <Flex w='100%' my='6' maxW={1480} mx='auto' px='6'>
                <Sidebar email={email} signOut={signOut} />
            </Flex>
        </Flex>
    )
}

export default DashBoard