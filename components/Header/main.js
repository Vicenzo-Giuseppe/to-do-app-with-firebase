import { Button } from "@chakra-ui/button"
import { Box, Container, Text } from "@chakra-ui/layout"
import Link from 'next/link'
import { GlassCard } from "../GlassCard"
import Logo from './logo'

const Header = ({ email, signOut }) => (
  <GlassCard noBorders>
    <Container maxW='container.xl' d='flex' justifyContent='space-between'>
      <Logo />
      <Box>

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
      </Box>
    </Container>
  </GlassCard>

)

export default Header
