import React from 'react'
import {
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import { Heading } from '@chakra-ui/react'
const Demo = () => {

  return (

    <div>

      <div >
        <div >
          <h3>Home</h3>

          <Heading variant='section-title'>Add a To-do</Heading>
        </div>
      </div>
    </div>

  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Demo)
