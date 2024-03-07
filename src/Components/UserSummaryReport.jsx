"use client"
import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Heading } from '@chakra-ui/react';
import axios from 'axios';

const UserSummaryReport = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/reports/getUserSummaryReport');
            setData(response.data.message);
            console.log(response.data.message)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Heading as="h2" size="lg" mb={4}>User Summary Report</Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Operator Name</Th>
                        <Th>Group Name</Th>
                        <Th>Group Sites</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((group) => (
                        <Tr key={group._id}>
                            <Td>{group.userData.OperatorName}</Td>
                            <Td>{group.groupData.groupName}</Td>
                            <Td>
                                <ul>
                                    {group.groupData.sites.map((site, index) => (
                                        <li key={index}>
                                            {site.pumpName}{' '}
                                            {site.completed ? (
                                                <Badge colorScheme="green">Completed</Badge>
                                            ) : (
                                                <Badge colorScheme="red">Not Completed</Badge>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </Td>
                            <Td>{group.status}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default UserSummaryReport;
