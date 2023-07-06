import { HStack, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMyTasks } from '../redux/actions/task';
import TaskNewCard from './TaskNewCard';

const MyTasks = () => {

    const dispatch = useDispatch();

    const { myTasks } = useSelector(state => state.task);

    useEffect(() => {
        dispatch(getMyTasks());
    }, [dispatch])

    // useEffect(() => {
    //     if (myTasks) {
    //         console.log(myTasks);
    //     }
    // }, [myTasks, dispatch])

    return (
        <VStack>
        <HStack flexWrap={'wrap'} justifyContent={'center'} mt={'1rem'}>
            {
                myTasks && myTasks.map(task => (
                    <TaskNewCard key={task._id} task={task} />
                ))
            }
        </HStack>
    </VStack>
    )
}

export default MyTasks
