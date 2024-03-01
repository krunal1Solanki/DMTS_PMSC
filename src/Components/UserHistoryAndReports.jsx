"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Heading, Button, Flex, IconButton } from '@chakra-ui/react';
import { Table } from 'antd';
import { DownloadIcon } from '@chakra-ui/icons'; // Import the DownloadIcon
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import the XLSX library for Excel export
import Loader from './Loader';


const UserHistoryAndReports = () => {
  const [historyReports, setHistoryReports] = useState([]);
  const [Loaders, setLoader] = useState(false);

  useEffect(() => {
    getUserHistoryReports();
  }, []);

  const getUserHistoryReports = async () => {
    setLoader(true);
  
    try {
      const apiUrl = '/api/sites/getUserSiteHistoryReport';
      const response = await fetch(apiUrl, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      });
  
      if (!response.ok) {
        console.log(`Error: ${response.status} - ${response.statusText}`);
      } else {
        const responseData = await response.json();
        setHistoryReports(responseData.message);
      }
  
      setLoader(false);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  

  const uniqueUserNames = [...new Set(historyReports.map((record) => record.userName))];

  const columns = [
    {
      title: 'Group Name',
      dataIndex: 'groupName',
      key: 'groupName',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      filters: uniqueUserNames.map((userName) => ({
        text: userName,
        value: userName,
      })),
      onFilter: (value, record) => record.userName.indexOf(value) === 0,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Creation Date',
      dataIndex: 'creationDate',
      key: 'creationDate',
      render: (text, record) => new Date(record.creationDate).toLocaleString(),
    },
  ];

  const exportToExcel = () => {
    const data = historyReports.map((record) => ({
      'Group Name': record.groupName,
      'User Name': record.userName,
      'Status': record.status,
      'Creation Date': new Date(record.creationDate).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'UserHistoryReports');
    XLSX.writeFile(wb, 'UserHistoryReports.xlsx');
  };

  return (
    <Card>
      <CardHeader
        bg="teal.500"
        borderBottomWidth="1px"
        borderColor="teal.600"
        color="white"
        textAlign="center"
        padding="4"
      >
        <Heading size="md" textTransform="uppercase">
          User History and Reports
        </Heading>
      </CardHeader>
      <CardBody>
        {Loaders ? (<Loader/>) : (<>

          <Table dataSource={historyReports} columns={columns} />
          <Flex justify="flex-start" position="absolute" bottom="4" left="4">
            <Button
              onClick={exportToExcel}
              colorScheme="teal"
              leftIcon={<DownloadIcon />}
            >
              Export to Excel
            </Button>
          </Flex>
        </>)}
      </CardBody>
    </Card>
  );
};

export default UserHistoryAndReports;
