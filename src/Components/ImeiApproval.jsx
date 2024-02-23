"use client";
import React, { useEffect, useState } from 'react';
import {
    Table,
    Tbody,
    Tr,
    Td,
    Switch,
    Th,
    Thead,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Flex,
    Button,
    useToast, // Import Chakra UI Button
} from '@chakra-ui/react';
import axios from 'axios';

const ImeiApproval = () => {
    const [users, setUsers] = useState([]);
    const toast = useToast();

    useEffect(() => {
        getUsersFun();
    }, []);

    const getUsersFun = async () => {
        try {
          const apiUrl = '/api/user/getUserWithGroups';
          const response = await fetch(apiUrl, {
        cache : 'no-store',
            
          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status} - ${response.statusText}`);
          }
      
          const responseData = await response.json();
          setUsers(responseData.message.filter((item) => typeof item.imeiPMSC === 'string' && !item.imeiPMSCApproved));
        } catch (error) {
          console.error('Error fetching users:', error.message);
        }
      };
      

    const handleSwitchChange = (index) => {
        setUsers((prevUsers) => {
            const updatedUsers = [...prevUsers];
            const updatedUser = {
                ...updatedUsers[index],
                approved: !updatedUsers[index].approved,
            };
            updatedUsers[index] = updatedUser;
            return updatedUsers;
        });
    };
    

    const handleUpdateClick = async (userId) => {
        const approve = users.find((user) => user._id === userId).approved;
        console.log(userId, approve);
      
        const body = {
          _id: userId,
          imeiPMSCApproved: approve,
        };
      
        try {
          const apiUrl = '/api/user/approveImei';
          await fetch(apiUrl, {
            method: 'POST',
            cache : 'no-store',

            body: JSON.stringify(body),
          });
      
          toast({
            title: 'IMEI Status',
            description: `IMEI has been ${approve ? 'approved' : 'disapproved'} successfully`,
            duration: 3000,
          });
      
          getUsersFun();
        } catch (error) {
          console.error(error);
        }
      };
      

    return (
        <Card>
            <CardHeader
                bg={'teal.500'}
                borderBottomWidth="1px"
                borderColor={'teal.600'}
                color="white"
                textAlign="center"
                padding="4"
            >
                <Flex>
                    <Heading size="md" textTransform="uppercase">
                        {'IMEI Approval'}
                    </Heading>
                </Flex>
            </CardHeader>
            <CardBody>
            <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Employee ID</Th>
                            <Th>Operator Name</Th>
                            <Th>IMEI</Th>
                            <Th>Approval Status</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users.map((user, index) => (
                            <Tr key={index}>
                                <Td>{user.pmscUserData.employeeId}</Td>
                                <Td>{user.OperatorName}</Td>
                                <Td>{user.imeiPMSC}</Td>
                                <Td>
                                    <Switch
                                        isChecked={user.approved || false}
                                        onChange={() => handleSwitchChange(index)}
                                    />
                                </Td>
                                <Td>
                                    <Button onClick={() => handleUpdateClick(user._id)}>
                                        Update
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default ImeiApproval;
