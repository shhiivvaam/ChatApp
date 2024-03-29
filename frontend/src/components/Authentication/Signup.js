import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";
const axios = require('axios')

const Signup = () => {

    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    // TODO : useHistory use krne mai kuch dikkat ha, theek kr
    // const history = useHistory();

    const handleClick = () => setShow(!show);

    const postDetails = (pics) => {
        setLoading(true);

        if (pics === undefined) {
            toast({
                title: 'Please Select an Image!',
                status: 'Warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "ChatApp")            //? name of the unsigned preset Application made in the Cloudinary
            data.append("cloud_name", "drjzfsnxg")           //? cloundinary cloud_name
            fetch("https://api.cloudinary.com/v1_1/drjzfsnxg/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then(data => {
                    setPic(data.url.toString());
                    console.log(data.url.toString())
                    console.log(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
        } else {
            toast({
                title: 'Please Select an Image!',
                status: 'Warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
    };

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please Fill All The Details!!',
                status: 'Warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Password and confirmPassword did not match!!',
                status: 'Warning',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const { data } = await axios.post(
                "/api/user",
                { name, email, password, pic },
                config
            );

            toast({
                title: 'Registeration Successfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            // history.pushState('/chats')
            // history.push('/chats');
        } catch (error) {
            toast({
                title: 'Error Occured',
                status: 'error',
                description: error.response.data.message,
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>
                    Name
                </FormLabel>
                <Input
                    placeholder='Enter you Name'
                    onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>
                <Input
                    placeholder='Enter you Email'
                    onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id='password' isRequired>
                <FormLabel>
                    Password
                </FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter you Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm"
                            onClick={handleClick}
                        >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='confirmpassword' isRequired>
                <FormLabel>
                    Confirm Password
                </FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm"
                            onClick={handleClick}
                        >
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="pic">
                <FormLabel>
                    Upload your Picture
                </FormLabel>
                <Input
                    type="file"
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme='blue'
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Signup