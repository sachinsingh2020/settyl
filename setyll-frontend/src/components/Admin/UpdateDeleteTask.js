import { HStack, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  getAllTasks } from '../../redux/actions/task';
import AdvancedTaskCard from '../others/AdvancedTaskCard';

const AllTasks = () => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');

    const { tasks } = useSelector(state => state.task);

    useEffect(() => {
        dispatch(getAllTasks(keyword));
    }, [dispatch, keyword])

    // useEffect(() => {
    //     if (tasks) {
    //         console.log(tasks);
    //     }
    // }, [tasks, dispatch])


    return (
        <VStack>
            <HStack maxW={'50rem'}>
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    type='search' placeholder='Search by Title or Description'
                    border={'2px solid #85325c'}
                    w={['18rem', '30rem']}
                />
            </HStack>
            <HStack flexWrap={'wrap'} justifyContent={'center'} mt={'1rem'}>
                {
                    tasks && tasks.map(task => (
                        <AdvancedTaskCard key={task._id} task={task}  />
                    ))
                }
            </HStack>
        </VStack>
    )
}

export default AllTasks
