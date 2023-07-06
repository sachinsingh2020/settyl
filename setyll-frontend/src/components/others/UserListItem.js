import React from 'react'
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ handleFunction, user }) => {
    // console.log(user);
    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="black"
            px={3}
            py={2}
            mb={2}
            borderRadius="lg"
        >
            <Box>
                <Text>{`${user.firstName} ${user.lastName}`}</Text>
                <Text fontSize="xs">
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    )
}

export default UserListItem
