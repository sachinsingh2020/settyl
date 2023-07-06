import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTaskStatus } from '../../redux/actions/task';
import * as d3 from 'd3';
import { Box, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { getAllUsers } from '../../redux/actions/user';


const DashBoard = () => {
    const dispatch = useDispatch();
    const svgRef = useRef();
    let data;

    const { completedTasks, incompleteTasks } = useSelector(state => state.task);
    const { users } = useSelector(state => state.user);


    useEffect(() => {
        dispatch(getTaskStatus());
        dispatch(getAllUsers());
    }, [dispatch])

    useEffect(() => {
        if (completedTasks && incompleteTasks) {
            // eslint-disable-next-line
            data = [
                {
                    property: "C.T", value: completedTasks.length
                },
                {
                    property: "I.T", value: incompleteTasks.length
                }
            ]

            const svg = d3.select(svgRef.current);

            const width = 300;
            const height = 300;

            const margin = { top: 20, right: 20, bottom: 20, left: 20 };

            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const radius = Math.min(innerWidth, innerHeight) / 2;

            const pie = d3.pie()
                .value(d => d.value)
                .sort(null);

            const arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);

            const color = d3.scaleOrdinal()
                .domain(data.map(d => d.property))
                .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

            const arcs = pie(data);

            svg.attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-width / 2, -height / 2, width, height]);

            svg.append("g")
                .attr("stroke", "white")
                .selectAll("path")
                .data(arcs)
                .join("path")
                .attr("fill", d => color(d.data.property))
                .attr("d", arc)
                .append("title")
                .text(d => `${d.data.property}: ${d.data.value.toLocaleString()}`);

            svg.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 12)
                .attr("text-anchor", "middle")
                .selectAll("text")
                .data(arcs)
                .join("text")
                .attr("transform", d => `translate(${arc.centroid(d)})`)
                .call(text => text.append("tspan")
                    .attr("y", "-0.4em")
                    .attr("font-weight", "bold")
                    .text(d => d.data.property))
                .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
                    .attr("x", 0)
                    .attr("y", "0.7em")
                    .attr("fill-opacity", 0.7)
                    .text(d => d.data.value.toLocaleString()));




        }
    }, [completedTasks, incompleteTasks])

    return (
        completedTasks && incompleteTasks && users &&
        <Stack direction={['column', 'row']} border={'2px solid #50596a'} background={'#50596a'} borderRadius={'10px'} p={['2rem', '5rem']}>
            <div  >
                <svg
                    ref={svgRef}
                ></svg>
            </div>
            <VStack p={'1rem 4rem'} justifyContent={'flex-start'} alignItems={'flex-start'} w={['100%','']}>
                <HStack justifyContent={'flex-start'} w={['12rem','15rem']}  >
                    <Box background={'#d13c4b'} border={'2px solid #d13c4b'} w={'10px'} h={'10px'} ></Box>
                    <Text fontWeight={'bold'} fontSize={['15px', '20px']} color={'#d13c4b'}>Completed Tasks (C.T)</Text>
                </HStack>
                <HStack justifyContent={'flex-start'}  w={['12rem','15rem']}  >
                    <Box background={'#4288b5 '} border={'2px solid #4288b5'} w={'10px'} h={'10px'}  ></Box>
                    <Text fontWeight={'bold'} fontSize={['15px', '20px']} color={'#4288b5'}  >Incompleted Tasks (I.T)</Text>
                </HStack>
                <HStack mt={'1.5rem'} fontWeight={'bold'} w={'100%'} justifyContent={'center'} p={'1rem 0'} color={'white'}>
                    <VStack alignItems={'flex-start'}>
                        <Text>Total Tasks:</Text>
                        <Text>Completed Tasks:</Text>
                        <Text>Incomplete Tasks:</Text>
                        <Text>Total Users: </Text>
                    </VStack>
                    <VStack>
                        <Text>{completedTasks.length + incompleteTasks.length}</Text>
                        <Text>{completedTasks.length}</Text>
                        <Text>{incompleteTasks.length}</Text>
                        <Text>{users.length}</Text>
                    </VStack>
                </HStack>
            </VStack>
        </Stack>
    )
}

export default DashBoard
