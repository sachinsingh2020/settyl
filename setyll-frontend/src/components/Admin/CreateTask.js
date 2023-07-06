import { Box, Button, FormLabel, HStack, Input, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserListItem from '../others/UserListItem.js'
import { getAllUsers } from '../../redux/actions/user';
import { createTask } from '../../redux/actions/task';
import UserBadgeItem from '../others/UserBadgeItem.js';

const CreateTask = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [search, setSearch] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [selectedUsers, setSelectedUsers] = useState([]);

    const { users, loading } = useSelector(state => state.user)
    const { error, message, loading: createLoading } = useSelector(state => state.task)

    const handleSearch = async (e) => {
        setSearch(e.target.value)
        if (!search) {
            await dispatch(getAllUsers("@"));
        }
        dispatch(getAllUsers(search));
    }

    // useEffect(() => {
    //     if (users) {
    //         console.log(users);
    //     }
    // }, [users])

    const handleGroup = (user) => {
        if (selectedUsers.find((u) => u._id === user._id)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }
        setSelectedUsers([user, ...selectedUsers,]);
    }

    const handleDelete = (userToDelete) => {
        setSelectedUsers(selectedUsers.filter((u) => u._id !== userToDelete._id));
        // console.log(selectedUsers);
    }

    const createTaskHandle = async () => {
        const selectedUsersStringify = JSON.stringify(selectedUsers.map((u) => u._id));
        await dispatch(createTask(title, description, dueDate, selectedUsersStringify));
    }


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
        }
    }, [dispatch, error, message, toast]);

    return (
        <Box background={'#50596a'} color={'white'} w={['95vw', '50vw']}>
            <HStack p={'2rem 2.5rem'} justifyContent={['flex-start', 'center']}>
                <VStack alignItems={'flex-start'}>
                    <FormLabel fontSize={['15px', '20px']} fontWeight={'bold'}>Title: </FormLabel>
                    <FormLabel fontSize={['15px', '20px']} fontWeight={'bold'}>Description: </FormLabel>
                    <FormLabel fontSize={['15px', '20px']} fontWeight={'bold'}>Due Date: </FormLabel>
                </VStack>
                <VStack>
                    <Input type={'text'}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        border={'2px solid white'} />
                    <Input type={'text'} border={'2px solid white'}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input type={'date'} border={'2px solid white'}
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </VStack>
            </HStack>
            <HStack justifyContent={['flex-start', 'center']} p={'2rem 1rem'}>
                <VStack alignItems={'center'} h={'45vh'}>
                    <FormLabel fontSize={['15px', '20px']} fontWeight={'bold'}>Assigned Users: </FormLabel>
                    <Input type='search' placeholder='Search User' background={'white'} color={'black'}
                        value={search}
                        onChange={handleSearch}
                        w={['10rem', '10rem']}
                        padding={'1rem'}
                    />
                    <Box w={'15vw'}  >
                        <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        <Box overflowY={'auto'} h={'13rem'}>
                            {loading ? (
                                <h1>loading...</h1>
                            ) : (
                                users && users?.map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                            )}
                        </Box>
                    </Box>
                </VStack>
                <Button pos={'fixed'} top={['13rem', '63.5%']} right={['-2.5rem', '35%']} onClick={createTaskHandle} isLoading={createLoading} >Create</Button>
            </HStack>
        </Box>
    )
}

export default CreateTask
