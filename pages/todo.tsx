import nookies from "nookies";
import { useRouter } from 'next/router'
import { admin } from "../firebase/initFirebaseAdmin";
import { InferGetServerSidePropsType, GetServerSidePropsContext } from "next";
import { db } from '../firebase/initFirebase'
import { ref, set, onValue, remove, serverTimestamp, update } from 'firebase/database'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
} from "@chakra-ui/react"
import { UpDownIcon } from "@chakra-ui/icons"
import { useEffect, useState } from 'react'
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
    Divider,
    useToast

} from "@chakra-ui/react"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import styles from '../styles/styles.module.css'
interface t {
    t: string,
    i: string,
}

interface Data {
    experience: number,
    isCompleted: boolean,
    timestamp: number,
    todo: string
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx);
        console.log(JSON.stringify(cookies, null, 2));
        const token = await admin.auth().verifyIdToken(cookies.token)

        const { uid, email } = token
        console.log(token)
        // the user is authenticated!
        // FETCH STUFF HERE

        return {
            props: { email, uid },
        };
    } catch (err) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page
        return {
            redirect: {
                permanent: false,
                destination: "/login",
            },
            // `as never` is required for correct type inference
            // by InferGetServerSidePropsType below
            props: {} as never,
        };
    }
};

function AuthenticatedPage(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const toast = useToast()
    const router = useRouter();
    const bg = useColorModeValue('red.500', 'teal.500')
    const textColor = useColorModeValue('#EDEDEE', '#1A202C')
    const inputColor = useColorModeValue('#1A202C', '#EDEDEE')
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([])
    const [value, setValue] = useState(Number)
    const [isCompleted, setIsCompleted] = useState(false)
    const { email, uid } = props
    const [data, setData] = useState<[Data]>()
    const [xp, setXp] = useState<number>(Number)
    const Range = (props) => {
        return (
            // render current the filled range of progress bar along its width
            <Box bg='pink.500' h='100%' borderRadius='inherit' style={{ width: `${props.percentRange}%` }} />
        );
    };
    const [percentRange, setProgress] = useState(0)
    const ProgressBar = (props) => {
        return (
            <Box w='100vh' h='25px' borderRadius='50px' border='2px solid #666' mb='30px'>
                {/*render available progress bar’s limit*/}
                <Range percentRange={props.percentRange} />
            </Box>
        );
    };

    useEffect(() => {
        if (uid && db) {
            const todoRef = ref(db, `users/${uid}`)
            onValue(todoRef, async function (snapshot) {
                if (snapshot.val() == null) {
                    console.log('User with no Data')
                    setTodos([])
                } else {

                    const tdata: any = Object.keys(snapshot.val())

                    setTodos(tdata)
                }
            })

        }
    }, [input])

    useEffect(() => {

        if (db) {
            const completedRef = ref(db, `users/${uid}/${todos}`)
            onValue(completedRef, (snapshot) => {
                if (snapshot.val()) {
                    const data: any = Object.values(snapshot.val())
                    setData(data)

                }
            })
        }
    }, [setIsCompleted])

    useEffect(() => {
        toast({
            position: 'bottom-left',
            title: `${value}XP`,
            status: "info",
            duration: 1000,
            isClosable: true,
        })
    }, [value])

    useEffect(() => {
        if (data) {
            data.forEach(async function (data: Data) {
                if (data.experience > 3 && data.isCompleted == true) {


                    const experience = data.experience / 10
                    setProgress(percentRange < 100 ? percentRange + experience : 100)

                }
            })
        }
    }, [data])


    const sendData = () => {
        if (input === '') {
            console.log('no Data to send')
        } else if (db) {
            try {

                if (value === undefined) {
                    set(ref(db, `users/${uid}/${input}`), {
                        todo: input,
                        timestamp: serverTimestamp(),
                        experience: 0,
                        isCompleted: false,
                    })

                } else {

                    set(ref(db, `users/${uid}/${input}`), {
                        todo: input,
                        timestamp: serverTimestamp(),
                        experience: value,
                        isCompleted: false,
                    })
                }
            } catch (error) {
                console.log(error)
            }

        }
    }

    const deleteTodo = (t: t) => {

        if (db) {
            try {
                const todoRef = ref(db, `users/${uid}/${t}`)
                remove(todoRef)

            } catch (error) {
                console.log(error)
            }
        }
    }

    function onChange(t) {
     if ()
            const todoData = {
                isCompleted: true,
            }

        if (db) {
            try {

                const todoRef = ref(db, `users/${uid}/${t}`)

                update(todoRef, todoData)


            } catch (error) {
                console.log(error)
            }
        }
    }

    return (

        <Container maxW="container.md">
            <div className={styles.container}>

                <ProgressBar percentRange={percentRange} />
                {/*  <div className={styles['toggle-buttons']}>
  <button onClick={() => setProgress(percentRange > 0 ?
    percentRange - 20 : 0)}>Decrease
  </button>
  <button onClick={() => setProgress(percentRange < 100 ? percentRange + 20 : 100)}>Increase</button>
  <button onClick={() => setProgress(0)}>Reset</button>
</div>
 */ }
            </div>
            <Flex justify="space-between" w="100%" align="center">

                <Heading mb={4} variant='section-title'>{email}!</Heading>




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
            <Slider

                onChangeEnd={(value) => setValue(value)}
                defaultValue={0}
                min={0} max={240}
                step={30}
                mt={1.5}


            >
                <SliderTrack SliderTrackbg={inputColor} boxSize={1}>
                    <SliderFilledTrack bg={bg} />
                </SliderTrack>

                <SliderThumb index={1} boxSize={5} bg={inputColor}>
                    <UpDownIcon boxSize={3} color={bg} />
                </SliderThumb>
            </Slider>

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

                                <Checkbox onChange={() => onChange(t)} />
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

export default AuthenticatedPage;

