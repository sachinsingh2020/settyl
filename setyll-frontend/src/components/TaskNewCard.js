import { Box, HStack, Switch, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doneTask, getMyTasks } from '../redux/actions/task';

const TaskNewCard = ({ task }) => {
    const dispatch = useDispatch();
    const [isSwitchOn, setIsSwitchOn] = useState(task.status === 'complete');

    const handleSwitchChange = async () => {
        setIsSwitchOn(!isSwitchOn);
        // Trigger your desired functionality here when the switch is turned on or off
        if (!isSwitchOn) {
            // Switch is turned on
            await dispatch(doneTask(task._id, "complete"));
            await dispatch(getMyTasks());
        } else {
            // Switch is turned off
            await dispatch(doneTask(task._id, "incomplete"));
            await dispatch(getMyTasks());
        }
    };

    return (
        <Box borderRadius={'10px'} minW={['20rem', '25rem']} p={'1rem'} background={'#85325c'} color={'white'} fontWeight={'bold'}>
            <HStack justifyContent={'center'} alignItems={'center'}>
                <VStack alignItems={'flex-start'}>
                    <Text>Title:</Text>
                    <Text>Description:</Text>
                    <Text>Due Date: </Text>
                    <Text>Status: </Text>
                    <Text>Change Status: </Text>
                </VStack>
                <VStack alignItems={'flex-start'} pt={'.2rem'}>
                    <Text>{task.title}</Text>
                    <Text>{task.description}</Text>
                    <Text>[{`${String(task.dueDate).split('T')[0]}`}]</Text>
                    <Text>{task.status}</Text>
                    <Switch
                        onChange={handleSwitchChange}
                        isChecked={isSwitchOn}
                    ></Switch>
                </VStack>
            </HStack>
        </Box>
    );
};

export default TaskNewCard;
