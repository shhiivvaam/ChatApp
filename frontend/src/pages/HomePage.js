import React from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Authentication/Login';
import Signup from '../components/Authentication/Signup';

function HomePage() {
    return (
        <Container maxW='xl' centerContent>
            <Box d='flex' justifyContent="center" p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px">
                <Text fontSize="4xl" fontFamily='Work Sans' color="black">
                    baateein karoo!!
                </Text>
            </Box>

            <Box bg='white' w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px">
                <Tabs variant='soft-rounded' colorScheme='green'>
                    {/* <Tabs variant='soft-rounded'> */}
                    <TabList mb="1em">
                        <Tab>Login</Tab>
                        <Tab>Sign Up</Tab>
                        {/* <Tab width="50%">Login</Tab>
                        <Tab width="50%">Sign Up</Tab> */}
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {/* Login */}
                            <Login/>
                        </TabPanel>
                        <TabPanel>
                            {/* Sign Up */}
                            <Signup/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage;
