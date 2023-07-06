import { Box, Button, HStack, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, getAllTasks } from '../../redux/actions/task';
import UpdateTaskModel from './UpdateTaskModel.js';

const AdvancedTaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const toast = useToast();
    const { isOpen, onToggle } = useDisclosure();
    const [deleteLoading, setDeleteLoading] = useState(false);


    const deleteTaskHandler = async () => {
        setDeleteLoading(true);
        await dispatch(deleteTask(task._id));
        await dispatch(getAllTasks());
        setDeleteLoading(false);
        toast({
            title: "Task Deleted",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom"
        })
    }



    return (
        <Box borderRadius={'10px'} minW={['20rem', '25rem']} p={'1rem'} background={'#85325c'} color={'white'} fontWeight={'bold'}>
            <HStack justifyContent={'center'} alignItems={'center'}>
                <VStack alignItems={'flex-start'}>
                    <Text>Title:</Text>
                    <Text>Description:</Text>
                    <Text>Due Date: </Text>
                    <Text>Status: </Text>
                    <Text>Assigned Users: </Text>
                </VStack>
                <VStack alignItems={'flex-start'} pt={'.2rem'}>
                    <Text>{task.title}</Text>
                    <Text>{task.description}</Text>
                    <Text>[{`${String(task.dueDate).split('T')[0]}`}]</Text>
                    <Text>{task.status}</Text>
                    <Box position="relative">
                        <Button
                            background={'#fafafa'}
                            onClick={onToggle}
                            cursor="pointer"
                            h={'2rem'}
                            p={2}
                            borderRadius="md"
                            transition="background 0.3s ease"
                        >
                            Users List
                            {isOpen ? <FaAngleDown style={{ marginLeft: ".5rem" }} /> : <FaAngleUp style={{ marginLeft: ".5rem" }} />}
                            {/* <FaAngleUp style={{ marginLeft: ".5rem" }} /> */}
                        </Button>
                        {isOpen && (
                            <Box
                                position="absolute"
                                top="100%"
                                left="0"
                                right="0"
                                p=".5rem 1rem"
                                mt="0.5rem"
                                borderRadius="md"
                                background="white"
                                color="black"
                                boxShadow="md"
                                zIndex={9999}
                                transition="opacity 0.3s ease"
                                minW={'10rem'}
                                fontWeight={'bold'}
                                fontSize={'15px'}
                            >
                                {task.assignedUsers.map((user) => (
                                    <Box
                                        key={user._id}
                                        cursor="pointer"
                                        w={'100%'}
                                    >
                                        {user.firstName} {user.lastName}
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                </VStack>
            </HStack>
            <HStack justifyContent={'space-evenly'} mt={'1rem'}>
                <UpdateTaskModel task={task}>
                    <Button fontSize={'14px'} p={'0rem 1rem'} background={'#fafafa'} color={'black'} _hover={{ background: '#5f5f5f', color: 'white' }} >Update</Button>
                </UpdateTaskModel>

                <Button fontSize={'14px'} p={'0rem 1rem'} background={'#fafafa'} color={'black'} _hover={{ background: '#5f5f5f', color: 'white' }} isLoading={deleteLoading} onClick={deleteTaskHandler} >Delete</Button>
            </HStack>
        </Box>
    );
};

export default AdvancedTaskCard;
