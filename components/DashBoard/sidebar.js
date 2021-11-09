import { Box, Stack, Text, Link as ChakraLink, Icon, Button } from "@chakra-ui/react";
import { RiDashboardLine } from 'react-icons/ri'
import Link from 'next/link'



const Sidebar = ({ email, signOut }) => (
    <Box as='aside' w='64' mr='8'>
        <Stack spacing='12' align='flex-start'>
            <Box>
                <Text fontW='bold' color='gray.400' fontSize='small'>HOME</Text>
                <Stack spacing='4' mt='8' align='stretch'>
                    <ChakraLink d='flex' align='center' color='pink.400'>
                        <Icon as={RiDashboardLine} fontSize='20' />
                        <Text ml='4' >DashBoard</Text>

                    </ChakraLink>
                    <ChakraLink d='flex' align='center' color='pink.400'>
                        <Icon as={RiDashboardLine} fontSize='20' />
                        <Text ml='4' >DashBoard</Text>
                    </ChakraLink>

                </Stack>
            </Box>
            {email ? (
                <>
                    <Text>Signed in as {email}</Text>
                    <Button
                        type="button"
                        onClick={() => {
                            signOut()
                        }}

                    >
                        Sign out
                    </Button>
                </>
            ) : (
                <>
                    <Text>You are not signed in.</Text>
                    <Link href="/auth">

                        <Button type="button" >
                            Sign in
                        </Button>

                    </Link>
                </>
            )}
        </Stack>
    </Box>


)


export default Sidebar
