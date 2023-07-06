import {
    Box,
    Button,
    Container,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
    IconButton,
    VStack,
    useToast,
    HStack,
    Text
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/user';
// import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();


    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(login(email, password));
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
        <Container maxH={'95vh'} minH={'75vh'}>
            <VStack h={'full'} mt={'3rem'} spacing={'16'}>
                <Heading
                    children={'Welcome '}
                    color={'white'}
                    background={'rgb(133,50,92)'}
                    py={'3'}
                    px={'6'}
                    borderRadius={'20'}
                />
                <form style={{ width: '100%' }}>
                    <Box my={4}>
                        <FormLabel htmlFor="email" children={'Email Address'} />
                        <Input
                            required
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="abc@gmail.com"
                            type="email"
                            focusBorderColor={'rgb(133,50 92)'}
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
                                type={showPassword ? 'text' : 'password'} // toggle between text and password
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
                    <Button
                        onClick={submitHandler}
                        my="4"
                        style={{ backgroundColor: '#85325c', color: 'white' }}
                        type="submit"
                    >
                        Login
                    </Button>

                    <Box my="4">
                        New User?{' '}
                        <Link to="/signup">
                            <Button color={'rgb(133,50,92)'} variant="link">
                                Sign Up
                            </Button>{' '}
                        </Link>
                        here
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
    );
};

export default Login;