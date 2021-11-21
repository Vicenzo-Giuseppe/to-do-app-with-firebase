
import { Heading, Flex, Stack, Input, Button } from '@chakra-ui/react'
import { useAuth } from '../firebase/authUserContext'
import Link from 'next/link'

export default function index() {
  return (
    <>

      <Flex
        align='center'
        justify='center'

      >
        <Flex
          w='100%'
          maxW={360}
          bg='#1a202c'
          p='8'
          borderRadius={8}
          flexDir='column'

        >

          <Link href='/todo'>
            <Button
              type='button'
              size='lg'
              fontSize='md'
              bg='linear-gradient(40deg, #ff6ec4, #7873f5)'
              _hover={{ bg: "linear-gradient(40deg, #ff6ec4, #7873f5)" }}
              color='#FFF'
            >
              Minha lista de To-do's
            </Button>
          </Link>

        </Flex>
      </Flex>
    </>
  )
}


