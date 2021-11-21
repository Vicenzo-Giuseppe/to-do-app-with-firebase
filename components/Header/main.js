import { Button } from "@chakra-ui/button"
import { Box, Container, Text } from "@chakra-ui/layout"
import Link from 'next/link'
import { GlassCard } from "../glassCard"

import Logo from './logo'

const Header = ({ email, signOut }) => (
  <>

    <GlassCard noBorders className='a'>

      <Container maxW='container.xl' d='flex' justifyContent='space-between' p={0} mb={0}>

        <Logo />

        <Box alignSelf='center' color='red'>
          {email ? (
            <>

              <Link href="/login">

                <Button
                  type="button"
                  bg='linear-gradient(to right,#8e2de2,#4a00e0)'
                  color='white'
                  borderRadius='25px'
                  _hover={{ bg: "linear-gradient(to right,#8e2de2,#4a00e0)" }}
                  onClick={() => {
                    signOut()
                  }}
                >
                  Sign out
                </Button>
              </Link>

            </>
          ) : (
            <>
              <Link href="/sign">
                <Button
                  type='button'
                  bg='linear-gradient(to right,#8e2de2,#4a00e0)'
                  color='white'
                  borderRadius='25px'
                  _hover={{ bg: "linear-gradient(to right,#8e2de2,#4a00e0)" }}
                  mr={5}
                >
                  Criar Conta
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  type="button"
                  bg='linear-gradient(to right,#8e2de2,#4a00e0)'
                  color='white'
                  borderRadius='25px'
                  _hover={{ bg: "linear-gradient(to right,#8e2de2,#4a00e0)" }}

                >
                  Entrar
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Container>
    </GlassCard >
  </>
)

export default Header
