"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Heading } from '@chakra-ui/react';

const AttendanceReport = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

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

    return (
        <div>
            <Heading as="h2" size="lg" mb={4}>Attendance Report</Heading>
            <Table variant="simple">
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
                                <Tr key={`${date}-${user._id}`}>
                                    <Td>{date}</Td>
                                    <Td>{user.OperatorName}</Td>
                                    <Td>
                                        {entries.find(entry => entry.userId === user._id && entry.checkingStatus === 'checkedIn') ?
                                            new Date(entries.find(entry => entry.userId === user._id && entry.checkingStatus === 'checkedIn').creationDate).toLocaleTimeString() :
                                            '-'
                                        }
                                    </Td>
                                    <Td>
                                        {entries.find(entry => entry.userId === user._id && entry.checkingStatus === 'checkedOut') ?
                                            new Date(entries.find(entry => entry.userId === user._id && entry.checkingStatus === 'checkedOut').creationDate).toLocaleTimeString() :
                                            '-'
                                        }
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
