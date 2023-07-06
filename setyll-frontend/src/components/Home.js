import { Box, Button, Container, HStack, Stack, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/user';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import AllTasks from './AllTasks';
import MyTasks from './MyTasks';



const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const [selection, setSelection] = useState("All")

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



    const allTaskHandler = () => {
        setSelection("All")
    }

    const myTaskHandler = () => {
        setSelection("My")
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
                <HStack justifyContent={'center'}>
                    <VStack mt={['1rem', '1rem']}>
                        <HStack border={'2px solid #85325c'}>
                            <Box onClick={allTaskHandler}
                                bg={selection === 'All' ? '#85325c' : 'transparent'}
                                color={selection === 'All' ? 'white' : 'black'}
                                _hover={{ cursor: 'pointer' }}
                                padding={'.5rem 1rem'}
                            >All Tasks</Box>
                            <Box onClick={myTaskHandler}
                                bg={selection === 'My' ? '#85325c' : 'transparent'}
                                color={selection === 'My' ? 'white' : 'black'}
                                _hover={{ cursor: 'pointer' }}
                                padding={'.5rem 1rem'}
                            >My Tasks</Box>
                        </HStack>
                        {
                            selection === 'My' ? <MyTasks /> : <AllTasks />
                        }
                    </VStack>

                </HStack>
            </Container>
    )
}

export default Home
