
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
    useColorModeValue,
    Checkbox,

} from "@chakra-ui/react"
import DarkModeSwitch from '../components/DarkModeSwitch'
import {
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
    AuthAction,
} from 'next-firebase-auth'
import getAbsoluteURL from '../utils/getAbsoluteURL'
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import firebase from 'firebase/app'
import 'firebase/firestore'
import "firebase/database"

const Todo = () => {
    const bg = useColorModeValue('red.500', 'teal.500')
    const textColor = useColorModeValue('#EDEDEE', '#1A202C')
    const inputColor = useColorModeValue('#1A202C', '#EDEDEE')
    const AuthUser = useAuthUser()
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([])
    const [value, setValue] = useState([1])
    const [isCompleted, setIsCompleted] = useState([false])

    // console.log(AuthUser)
    // console.log(todos)
    function dataAtualFormatada() {
        const edata = new Date(),
            dia = edata.getDate().toString().padStart(2, '0'),
            mes = (edata.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            ano = edata.getFullYear();
        return dia + "/" + mes + "/" + ano;
    }



    useEffect(() => {
        AuthUser.id &&
            firebase
                .database()
                .ref(`users/${AuthUser.displayName}`)
                .on('value', async function (snapshot) {
                    if (snapshot.val() == null) {
                        console.log('User with no Data')
                        setTodos([])
                    } else {

                        const data: any = Object.keys(snapshot.val())
                        setTodos(data)
                    }
                })
    }, [input])

    useEffect(() => {
        console.log(isCompleted)
    }, [setIsCompleted])

    const sendData = () => {

        if (input === '') {
            console.log('no Data to send')
        } else {
            try {
                firebase
                    .database()
                    .ref(`users/${AuthUser.displayName}/${input}`)
                    .set({
                        todo: input,
                        timestamp: firebase.database.ServerValue.TIMESTAMP,
                        experience: `${value[1]}`,
                        isCompleted: false,
                    })
            } catch (error) {
                console.log(error)
            }

        }
    }
    interface t {
        t: string,
        i: string,
    }
    const deleteTodo = (t: t) => {
        try {
            firebase
                .database()
                .ref(`users/${AuthUser.displayName}/${t}`)
                .remove()

        } catch (error) {
            console.log(error)
        }
    }

    function onChange() {
        console.log('data send!')
    }

    return (

        <Container maxW="container.md">

            <Flex justify="space-between" w="100%" align="center">

                <Heading mb={4} variant='section-title'>{AuthUser.displayName}!</Heading>
                <Flex bg={bg}>
                    <DarkModeSwitch />

                </Flex>
            </Flex>

            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={<AddIcon color={bg} />}
                />
                <Input bg={inputColor} color={textColor} type="text" onChange={(e) => setInput(e.target.value)} focusBorderColor={bg} />
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
                                <Checkbox onChange={onChange} />
                                <Flex align="center">
                                    <Text color={textColor}>{t}</Text>
                                </Flex>
                                <IconButton aria-label="Delete to-do" color='#FFF' bgColor={bg} onClick={() => deleteTodo(t)} icon={<DeleteIcon />} />
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
