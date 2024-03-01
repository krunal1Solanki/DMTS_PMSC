"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Button,
    useToast
} from '@chakra-ui/react';
import Loader from './LOader';

const ActiveSite = () => {
    const [sites, setSites] = useState([]);
    const [LOader, setLOader] = useState(false);
    const toast = useToast();

    useEffect(() => {
        getSites();
    }, []);

    const getSites = async () => {
        setLOader(true);
      
        try {
          const apiUrl = "/api/sites/getAllSites";
          const response = await fetch(apiUrl, {
             headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch sites: ${response.status} - ${response.statusText}`);
          }
      
          const responseData = await response.json();
          console.log("RESSSSSSSS", responseData)
          setSites(responseData.message);
        } catch (error) {
          console.error('Error fetching sites:', error);
        } finally {
          setLOader(false);
        }
      };
      

    const handleCheckboxChange = (index, val) => {
        console.log(index, val)
        const updatedSites = [...sites];
        updatedSites[index].isDMTSActive = val;
        console.log("logg", updatedSites[index].isDMTSActive)
        setSites(updatedSites)
    };


    const handleSiteStatusSubmit = async (id, newIsDMTSActive) => {
        setLOader(true);
      
        try {
          const apiUrl = "/api/sites/siteStatus";
          await fetch(apiUrl, {
            method: 'POST',
             headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

            body: JSON.stringify({
              _id: id,
              isDMTSActive: newIsDMTSActive,
            }),
          });
      
          toast({
            title: "Submit Successful",
            description: `Site status updated successfully for site with ID ${id}`,
            status: "success",
            position: 'top-right',
            duration: 3000,
            isClosable: true,
          });
      
          // You may want to refresh the site data after updating
        } catch (error) {
          console.error("Error updating site status:", error);
      
          toast({
            title: "Submit Error",
            description: `An error occurred while updating site status for site with ID ${id}`,
            status: "error",
            position: 'top-right',
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setLOader(false);
        }
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
                    Active Sites
                </Heading>
            </CardHeader>
            <CardBody>
                {LOader ? (<Loader />) : (<>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>No</Th>
                                <Th>Site Name</Th>
                                <Th>Is DMTS Active</Th>
                                <Th>Submit</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sites.map((site, index) => (
                                <Tr key={site._id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{site.pumpName}</Td>
                                    <Td>
                                        <Checkbox
                                            defaultChecked={site.isDMTSActive}
                                            onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                                        />
                                    </Td>
                                    <Td>
                                        <Button
                                            colorScheme="teal"
                                            onClick={() => handleSiteStatusSubmit(site._id, site.isDMTSActive)}
                                        >
                                            Submit
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </>)}
            </CardBody>
        </Card>
    );
};

export default ActiveSite ;
