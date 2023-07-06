import { Box, Button, Container, HStack, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/user';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import AllTasks from './AllTasks';
import DashBoard from './Admin/DashBoard';
import CreateTask from './Admin/CreateTask';
import UpdateDeleteTask from './Admin/UpdateDeleteTask';



const AdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const [selection, setSelection] = useState("DashBoard")

    const logoutHandler = async (e) => {
        e.preventDefault();
        await dispatch(logout());
    }

    const { error, message, me } = useSelector(state => state.user)

    useEffect(() => {
        if (error) {
            toast({
                title: error,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            dispatch({ type: 'clearError' });
        }
        if (message) {
            toast({
                title: message,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            dispatch({ type: 'clearMessage' });
            navigate('/login');
        }
    }, [dispatch, error, message, toast, navigate]);



    const dashBoardHandler = () => {
        setSelection("DashBoard")
    }

    const allTaskHandler = () => {
        setSelection("All")
    }

    const createTaskHandler = () => {
        setSelection("Create")
    }

    const updateDeleteTaskHandler = () => {
        setSelection("UpdateDelete")
    }


    return (
        !me ? <h1>Loading...</h1> :
            <Container maxW={'90vw'}>
                <Stack direction={['column', 'row']} justifyContent={'space-between'} alignItems={'center'}>
                    <VStack mt={'2rem'} alignItems={'flex-start'} p={'.5rem 1rem'} style={{ backgroundColor: '#85325c', color: 'white', }} borderRadius={'10px'} fontWeight={'bold'} >
                        <Text>Profile Name: {`${me.firstName} ${me.lastName}`}</Text>
                        <Text>Profile Email: {`${me.email}`}</Text>
                        <Text>Profile Role: {`${me.role}`}</Text>
                    </VStack>
                    <Button rightIcon={<FaSignOutAlt />} onClick={logoutHandler} style={{ backgroundColor: '#85325c', color: 'white', }} mt={'1.5rem'} >Logout</Button>
                </Stack>

                <HStack justifyContent={'center'}   >
                    <VStack mt={['1rem', '1rem']}  >
                        <Box overflowX={'auto'} borderRadius={'7px'}>
                            <Box border={'2px solid #85325c'} overflowX={"auto"} overflowY={'auto'} whiteSpace={'nowrap'} >
                                <Button onClick={dashBoardHandler}
                                    bg={selection === 'DashBoard' ? '#85325c' : 'transparent'}
                                    color={selection === 'DashBoard' ? 'white' : 'black'}
                                    _hover={{ cursor: 'pointer' }}
                                    padding={['.3rem .5rem', '.5rem 1rem']}
                                    fontSize={['10px', '15px']}
                                >DashBoard</Button>
                                <Button onClick={allTaskHandler}
                                    bg={selection === 'All' ? '#85325c' : 'transparent'}
                                    color={selection === 'All' ? 'white' : 'black'}
                                    _hover={{ cursor: 'pointer' }}
                                    padding={'.5rem 1rem'}
                                    fontSize={['10px', '15px']}
                                >All Tasks</Button>
                                <Button onClick={createTaskHandler}
                                    bg={selection === 'Create' ? '#85325c' : 'transparent'}
                                    color={selection === 'Create' ? 'white' : 'black'}
                                    _hover={{ cursor: 'pointer' }}
                                    padding={'.5rem 1rem'}
                                    fontSize={['10px', '15px']}
                                >Create Task</Button>
                                <Button onClick={updateDeleteTaskHandler}
                                    bg={selection === 'UpdateDelete' ? '#85325c' : 'transparent'}
                                    color={selection === 'UpdateDelete' ? 'white' : 'black'}
                                    _hover={{ cursor: 'pointer' }}
                                    padding={'.5rem 1rem'}
                                    fontSize={['10px', '15px']}

                                >Delete/Update Task</Button>
                            </Box>
                        </Box>
                        {/* <div style={{ overflowX: "auto",overflowY:'auto' }} > */}

                        {/* </div> */}

                        {/* <HStack style={{ overflowX: 'auto', flex: '1', display: 'flex', flexDirection: 'row', whiteSpace: 'nowrap', minWidth: "100%" }} border={'2px solid #85325c'} >
                            
                        </HStack> */}
                        <Box mt={'2rem'}>
                            {
                                selection === 'DashBoard' ? <DashBoard /> : null
                            }
                            {
                                selection === 'All' ? <AllTasks /> : null
                            }
                            {
                                selection === 'Create' ? <CreateTask /> : null
                            }
                            {
                                selection === 'UpdateDelete' ? <UpdateDeleteTask /> : null
                            }
                        </Box>
                    </VStack>

                </HStack>
            </Container>
    )
}

export default AdminPage
