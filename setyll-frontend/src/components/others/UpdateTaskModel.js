import { ModalFooter, useDisclosure, useToast } from '@chakra-ui/react';
import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserBadgeItem from './UserBadgeItem';
import UserListItem from './UserListItem';
import { getAllUsers } from '../../redux/actions/user';
import { getAllTasks, updateTask } from '../../redux/actions/task';

const UpdateTaskModel = ({ children, task }) => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [updateLoading, setUpdateLoading] = useState(false);
    const toast = useToast();

    const { loading, error, users } = useSelector(state => state.user);

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
        // if (message) {
        //     toast({
        //         title: message,
        //         status: "success",
        //         duration: 5000,
        //         isClosable: true,
        //         position: "bottom"
        //     });
        //     dispatch({ type: 'clearMessage' });

        // }

    }, [dispatch, error, toast,])

    const handleSubmit = async (e) => {
        setUpdateLoading(true);
        const selectedUsersStringify = JSON.stringify(selectedUsers.map((u) => u._id));
        await dispatch(updateTask(task._id, title, description, selectedUsersStringify));
        await dispatch(getAllTasks());
        setUpdateLoading(false);

        toast({
            title: "Task Updated",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        });
    }

    const handleSearch = async (e) => {
        setSearch(e.target.value)
        if (!search) {
            await dispatch(getAllUsers("@"));
        }
        dispatch(getAllUsers(search));
    }


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

    // if (group) {
    //     console.log(group);
    // }

    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent w={["300px", "420px"]}>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Update Task
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center">
                        <FormControl>
                            <Input
                                value={title}
                                placeholder="New Name"
                                mb={3}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                value={description}
                                placeholder="New Description"
                                mb={3}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users eg: John, Piyush, Jane"
                                mb={1}
                                onChange={handleSearch}
                            />
                        </FormControl>
                        <Box w="100%" display="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        {
                            loading ? <div>Loading...</div> :
                                users?.map((user) => (
                                    <UserListItem key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} isLoading={updateLoading} color={'white'} background={'#85325c'}
                            _hover={{ cursor: 'pointer' }}
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateTaskModel
