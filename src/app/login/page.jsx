"use client"
import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { enc, AES } from 'crypto-js';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '@/redux/features/auth-slice';

const LoginPage = () => {
    const router = useRouter();
    const toast = useToast();
    const dispatch = useDispatch();
    const [OperatorName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {

        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                cache : 'no-store',

                body: JSON.stringify({ OperatorName, password }),
              });
              
              if (!response.ok) {
                // Handle error, for example:
                throw new Error(`Failed to log in: ${response.status} - ${response.statusText}`);
              }
              
              const responseData = await response.json();
              // Use responseData as needed
              
            
            if (responseData.message == 'User found!') {
                router.push('/')
                dispatch(logIn(responseData.user))
                toast({
                    title: 'Login Successful',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
            } else {
                toast({
                    title: responseData.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'

                });
            }
        } catch (error) {
            toast({
                title: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'

            })
        }
    };

    const loginFormStyles = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        width: '300px',
        boxShadow: '0px 4px 6px rgba(1, 2, 2, 0.1)',
    };

    return (
        <VStack spacing={4} align="center" mt={40}>
            <Box {...loginFormStyles}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FaUser color="gray.300" />}
                    />
                    <Input
                        type="text"
                        placeholder="Empoyee Id"
                        value={OperatorName}
                        onChange={(e) => setUsername(e.target.value)}
                        borderRadius="4px"
                        border="1px solid #ddd"
                        _focus={{ border: '1px solid #63B3ED' }}
                    />
                </InputGroup>
            </Box>

            <Box {...loginFormStyles}>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FaLock color="gray.300" />}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        borderRadius="4px"
                        border="1px solid #ddd"
                        _focus={{ border: '1px solid #63B3ED' }}
                    />
                </InputGroup>
            </Box>

            <Button colorScheme="teal" onClick={handleLogin}>
                Login
            </Button>
        </VStack>
    );
};

export default LoginPage;
