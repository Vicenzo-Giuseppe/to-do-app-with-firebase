// @ts-nocheck 
import {
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,

} from "@chakra-ui/react"
import { UpDownIcon } from "@chakra-ui/icons"
import React, { useState, useEffect } from 'react'
import {
    Box,
    Flex,
    Heading,
    InputGroup,
    InputLeftElement,
    Input,
    Button,
    Text,
    IconButton,
    Container,
    useColorModeValue
} from "@chakra-ui/react"
import DarkModeSwitch from '../components/DarkModeSwitch'
import {
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
    AuthAction,
} from 'next-firebase-auth'
import getAbsoluteURL from '../utils/getAbsoluteURL'
import { AddIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons"
import firebase from 'firebase/app'
import 'firebase/firestore'
import Slider from '../components/Slider/main'


const Todo = () => {
    const bg = useColorModeValue('red.500', 'teal.500')
    const textColor = useColorModeValue('#EDEDEE', '#1A202C')
    const inputColor = useColorModeValue('#1A202C', '#EDEDEE')
    const AuthUser = useAuthUser()
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([])
    const [value, setValue] = useState([])

    // console.log(AuthUser)
    // console.log(todos)

    useEffect(() => {
        AuthUser.id &&
            firebase
                .firestore()
                .collection(AuthUser.email)
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => {

                    setTodos(snapshot.docs.map(doc => doc.data().todo))
                })
    })


    useEffect(() => {
        console.log(value[1])
    }, [value])




    const sendData = () => {

        try {
            // try to update doc
            firebase
                .firestore()
                .collection(AuthUser.email) // each user will have their own collection
                .doc(input) // set the collection name to the input so that we can easily delete it later on
                .set({
                    todo: input,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    experience: `${value[1]}`

                })
                .then(console.log('Data was successfully sent to cloud firestore!'))
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = (t) => {
        try {
            firebase
                .firestore()
                .collection(AuthUser.email)
                .doc(t)
                .delete()
                .then(console.log('Data was successfully deleted!'))
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Container maxW="container.md">

            <Flex justify="space-between" w="100%" align="center">
                <Heading mb={4} variant='section-title'>{AuthUser.email} !</Heading>
                <Flex>
                    <DarkModeSwitch bg={bg} />

                </Flex>
            </Flex>

            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<AddIcon color={bg} />}
                />
                <Input bg={inputColor} color={textColor} type="text" onChange={(e) => setInput(e.target.value)} />
                <Button
                    ml={2}
                    onClick={() => sendData()}
                    bg={bg}
                >
                    Add Todo
                </Button>

            </InputGroup>
            <RangeSlider
                aria-label={["min", "max"]}
                onChangeEnd={(value) => setValue(value)}
                defaultValue={[0, 0]}
                min={0} max={240}
                step={30}
                mt={1.5}


            >
                <RangeSliderTrack bg={inputColor} boxSize={1}>
                    <RangeSliderFilledTrack bg={bg} />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} bg='none' />
                <RangeSliderThumb index={1} boxSize={5} bg={inputColor}>
                    <UpDownIcon boxSize={3} color={bg} />
                </RangeSliderThumb>
            </RangeSlider>
            <Box mt='1.25rem'>
                {todos.map((t, i) => {
                    return (
                        <>
                            <Flex
                                key={i}
                                bgColor={inputColor}

                                w="100%"
                                p={5}
                                my={2}
                                align="center"
                                borderRadius={5}
                                justifyContent="space-between"
                                opacity='0.84'
                            >
                                <Flex align="center">
                                    <Text color={textColor}>{t}</Text>
                                </Flex>
                                <IconButton color='#FFF' bgColor={bg} onClick={() => deleteTodo(t)} icon={<DeleteIcon />} />
                            </Flex>
                        </>
                    )
                })}

            </Box>

        </Container >
    )

}

export const getServerSideProps = withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
    // Optionally, get other props.
    // You can return anything you'd normally return from
    // `getServerSideProps`, including redirects.
    // https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
    const token = await AuthUser.getIdToken()
    const endpoint = getAbsoluteURL('/api/example', req)
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            Authorization: token || 'unauthenticated',
        },
    })
    const data = await response.json()
    if (!response.ok) {
        throw new Error(
            `Data fetching failed with status ${response.status}: ${JSON.stringify(
                data
            )}`
        )
    }
    return {
        props: {
            favoriteColor: data.favoriteColor,
        },
    }
})

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(Todo)
