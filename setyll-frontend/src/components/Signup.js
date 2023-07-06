import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Button, Container, FormLabel, Heading, HStack, Input, Stack, Text, useToast, VStack } from '@chakra-ui/react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/user';

const Signup = () => {

    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const submitHandler = async e => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            return toast({
                title: "Empty Fields",
                description: "Please Fill All the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
        }
        await dispatch(register(firstName, lastName, email, password));
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const { error, message } = useSelector(state => state.user)

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
            navigate('/');
        }
    }, [dispatch, error, message, toast, navigate]);

    // useEffect(() => {
    //     if (user) {
    //         console.log("user", user);
    //     }
    // }, [user])

    return (
        // loading ? <Loader /> :
        <Container maxH={'150vh'} >
            <VStack h={'full'} justifyContent="center" spacing={'16'}>
                <Heading mt={'3rem'} textTransform={'uppercase'} children={'Registration'} color={'white'} background={'rgb(133,50,92)'} py={'3'} px={'6'} borderRadius={'20'} />

                <form onSubmit={submitHandler} style={{ width: '130%' }} >
                    <HStack justifyContent={'center'} >
                        <Stack direction={['column', 'row']}>
                            <Box my={'4'} maxW={'40rem'}>
                                <FormLabel htmlFor="firstName" children="First Name" />
                                <Input
                                    required
                                    id="firstName"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    type={'text'}
                                    focusBorderColor="yellow.500"
                                    w={"19.5rem"}
                                />
                            </Box>
                            <Box my={'4'}>
                                <FormLabel htmlFor="lastName" children="Last Name" />
                                <Input
                                    required
                                    id="lastName"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    type={'text'}
                                    focusBorderColor="yellow.500"
                                    maxW={'20rem'}
                                    w={'19.5rem'}

                                />
                            </Box>
                        </Stack>
                    </HStack>
                    <Box ml={['3.5rem', "0rem"]} >
                        <Box my={'4'}>
                            <FormLabel htmlFor="email" children="Email Address" />
                            <Input
                                required
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="abc@gmail.com"
                                type={'email'}
                                focusBorderColor="yellow.500"
                            />
                        </Box>
                        <Box my={4}>
                            <FormLabel htmlFor="password" children={'Password'} />
                            <InputGroup>
                                <Input
                                    required
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter Your Password"
                                    type={showPassword ? 'text' : 'password'}
                                    focusBorderColor={'rgb(133,50,92)'}
                                />
                                <InputRightElement>
                                    <IconButton
                                        variant="ghost"
                                        aria-label={showPassword ? 'Hide Password' : 'Show Password'}
                                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                        onClick={toggleShowPassword}
                                    />
                                </InputRightElement>
                            </InputGroup>
                        </Box>


                        <Button my="4" background={'rgb(133,50,92)'} color={'white'} type="submit">
                            Sign Up
                        </Button>

                        <Box my="4">
                            Already Signed Up?{' '}
                            <Link to="/login">
                                <Button color={'rgb(133,50,92)'} variant="link">
                                    Login
                                </Button>{' '}
                                here
                            </Link>
                        </Box>
                    </Box>

                </form>
            </VStack>
            <Box border={'2px solid #85325c'} display={'flex'} flexDir={'column'} alignItems={'center'} fontWeight={'bold'}>
                <HStack p={'1rem 1rem'}>
                    <Text >
                        For Admin Login:
                    </Text>
                    <VStack alignItems={'flex-start'} >
                        <Text>
                            Email: sachin@gmail.com
                        </Text>
                        <Text>
                            Password: sachin
                        </Text>
                    </VStack>
                </HStack>
                <hr style={{ border: "1px solid black", width: "100%" }} />
                <HStack p={'1rem 0'}>
                    <Text>
                        For User Login:
                    </Text>
                    <VStack alignItems={'flex-start'} >
                        <Text>
                            Email: boxer@gmail.com
                        </Text>
                        <Text>
                            Password: sachin
                        </Text>
                    </VStack>
                </HStack>
                <hr style={{ border: "1px solid black", width: "100%" }} />
                <Text p={'1rem 0'}>
                    You Can Also Register New User
                </Text>
            </Box>
        </Container>
    )
}

export default Signup
