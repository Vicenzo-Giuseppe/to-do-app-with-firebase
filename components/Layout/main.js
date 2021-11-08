import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import Header from '../Header/main'
import {
    useAuthUser,
    withAuthUser,

} from 'next-firebase-auth'

const Main = ({ children, router }) => {
    const AuthUser = useAuthUser()
    return (
        <Box as='main' pb={8}>
            <Header email={AuthUser.email} signOut={AuthUser.signOut} />
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale' />
                <title>To-Do App</title>
            </Head>

            <Container maxW='container.xl' pt={14}>
                {children}
            </Container>
        </Box>
    )
}



export default withAuthUser()(Main)
