"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Heading, Box, Select, Divider } from '@chakra-ui/react';

const AttendanceReport = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedOperator, setSelectedOperator] = useState(null);

    useEffect(() => {
        fetchData();
    }, [selectedOperator]);

    const fetchData = async () => {
        try {
            const resp = await axios.get('/api/reports/userAttendanceReport');
            const resp2 = await axios.get('/api/user/getDmtsUser');
            setUsers(resp2.data.message);
            const sortedData = resp.data.message.sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
            const organizedData = organizeDataByDate(sortedData);
            setAttendanceData(organizedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const organizeDataByDate = (data) => {
        const organizedData = {};
        data.forEach((entry) => {
            const date = new Date(entry.creationDate).toDateString();
            if (!organizedData[date]) {
                organizedData[date] = [];
            }
            organizedData[date].push(entry);
        });
        return organizedData;
    };

    const handleOperatorChange = (event) => {
        setSelectedOperator(event.target.value);
    };

    return (
        <div>
            <Heading as="h2" size="lg" mb={4}>Attendance Report</Heading>
            <Box mb={4}>
                    <Select
                    w={'20%'}
                        bg="teal.500"
                        borderColor="teal.500"
                        value={selectedOperator}
                        onChange={handleOperatorChange}
                        placeholder="Select an operator"
                    >
                        <option value="">All Operators</option>
                        {users.map(user => (
                            <option key={user._id} value={user.OperatorName}>{user.OperatorName}</option>
                        ))}
                    </Select>
            </Box>
            <Divider/>
            <Table mt={5} variant="striped">
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Operator Name</Th>
                        <Th>Checkin Time</Th>
                        <Th>Checkout Time</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.entries(attendanceData).map(([date, entries]) => (
                        <React.Fragment key={date}>
                            {users.map(user => (
                                (!selectedOperator || user.OperatorName === selectedOperator) && // Apply filter
                                <Tr key={`${date}-${user._id}`}>
                                    <Td>{date}</Td>
                                    <Td>{user.OperatorName}</Td>
                                    <Td>
                                        {entries.filter(entry => entry.userId === user._id && entry.checkingStatus === 'checkedIn').map((checkin, index, array) => (
                                            <React.Fragment key={checkin._id}>
                                                {new Date(checkin.creationDate).toLocaleTimeString()}
                                                {index < array.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </Td>
                                    <Td>
                                        {entries.filter(entry => entry.userId === user._id && entry.checkingStatus === 'checkedOut').map((checkout, index, array) => (
                                            <React.Fragment key={checkout._id}>
                                                {new Date(checkout.creationDate).toLocaleTimeString()}
                                                {index < array.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </Td>
                                    <Td>
                                        {entries.find(entry => entry.userId === user._id) ?
                                            <Badge colorScheme="green">Present</Badge> :
                                            <Badge colorScheme="red">Absent</Badge>
                                        }
                                    </Td>
                                </Tr>
                            ))}
                        </React.Fragment>
                    ))}
                </Tbody>
            </Table>
        </div>
    );
};

export default AttendanceReport;