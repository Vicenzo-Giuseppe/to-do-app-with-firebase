import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import { GrowList } from '../components/GrowList'


const Demo = () => {

  return (
    <GrowList>
      <div>

        <div >
          <div >
            <h3>Home</h3>

            <a href="/todo" style={{ fontSize: "40px", textDecoration: 'underline' }}>Add a todo!</a>
          </div>
        </div>
      </div>
    </GrowList>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Demo)
