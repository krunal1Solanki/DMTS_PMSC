"use client"
import React, { useState, useEffect } from 'react';
import { Transfer, message, Popconfirm } from 'antd';
import { FaExclamationTriangle, FaMapMarker } from 'react-icons/fa';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { ArrowRightIcon } from '@chakra-ui/icons';
import {
    Card,
    CardHeader,
    CardBody,
    Grid,
    Heading,
    Input,
    Button,
    Table,
    Tbody,
    Tr,
    Th,
    Td,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Divider,
    Flex,
    Text,
    Select, // Added Select component
} from '@chakra-ui/react';
import Loader from "./Loader";

const CreateGroups = () => {
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState(useSelector((state) => state.userReducer.value.users) || []);
    const [sites, setSites] = useState([]);
    const toast = useToast();
    const [emergency, setEmergency] = useState(false);
    const [groupName, setGroupName] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentGroup, setCurrentGroup] = useState(null);
    const [creatgroupbuttonLOader, setCreateGroupButtonLOader] = useState(false);
    const [getSitesLOader, setGetSitesLOader] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // New state variable for selected user

    useEffect(() => {
        getSites();
        getGroups();
    }, []);


    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    const getGroups = async () => {
        try {
          const apiUrl = '/api/sites/getSiteGroups';
          const response = await fetch(apiUrl, {
            headers : {
                "Content-Type": "application/json",
          "Cache-Control": "no-cache",
            }
          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch site groups: ${response.status} - ${response.statusText}`);
          }
      
          const responseData = await response.json();
          setGroups(responseData.message);
        } catch (err) {
          console.log('err', err.message);
        }
      };
      

    useEffect(() => {
        // Save targetKeys to localStorage whenever it changes
        localStorage.setItem('targetKeys', JSON.stringify(targetKeys));
    }, [targetKeys]);

    const handleCreateGroup = async () => {
        if (groupName.length === 0) {
            toast({
                title: "Validation Error",
                position: 'top-right',
                description: 'Please enter group name',
                status: 'warning',
                duration: '3000'
            })
            return;
        }

        if (targetKeys.length === 0) {
            toast({
                title: "Validation Error",
                position: 'top-right',
                description: 'Please select sites for grouping',
                status: 'warning',
                duration: '3000'
            })
            return;
        }

        setCreateGroupButtonLOader(true)

        console.log("OIO 2", pumpData)
        const pumpNames = pumpData.filter((item) => targetKeys.includes(item.key)).map((item) => item.title);
        console.log("OIO 4", pumpNames, targetKeys)
        
        const siteArray = pumpData
        .filter((item) => targetKeys.includes(item.key+""))
        .map((item) => ({
            siteId: item._id,
            pumpName: item.title,
            latitude: item.latitude,
            longitude: item.longitude
        }));

        console.log("OIO 5", siteArray)
    

        // const siteArray = pumpNames.map((pumpName, index) => ({
        //     siteId: targetKeys[index],
        //     pumpName: pumpName,
        //     latitude: pumpData[index].latitude,    // Include latitude
        //     longitude: pumpData[index].longitude,  // Include longitude
        // }));

        try {

            if (emergency && !selectedUser) {
                toast({
                    description: 'Please select user!',
                    status: 'warning',
                    position: 'top-right',
                    duration: 3000,
                    isClosable: true,
                });
                setCreateGroupButtonLOader(false)
                return;
            }


            if (emergency) {
                const body = {
                    user: selectedUser,
                    group: {
                        groupName,
                        sites: siteArray
                    }
                };
                try {
                    const info = await fetch('/api/sites/assignEmergencyRoute', {
                        method: 'POST',
                         headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

                        body: JSON.stringify(body),
                      });
                      
                      if (!info.ok) {
                        throw new Error(`Failed to assign emergency route: ${info.status} - ${info.statusText}`);
                      }
                      
                      const responseData = await info.json();
                      // Use responseData as needed
                      
                    toast({
                        description: 'Emergency route assigned successfully!',
                        status: 'success',
                        position: 'top-right',
                        duration: 3000,
                        isClosable: true,
                    });
                } catch (error) {
                    console.log(error.message)
                    toast({
                        description: error.message,
                        status: 'warning',
                        position: 'top-right',
                        duration: 3000,
                        isClosable: true,
                    });
                } finally {
                    setTargetKeys([]);
                    setSelectedKeys([]);
                    setGroupName('');
                    setSelectedUser(undefined);
                    setCreateGroupButtonLOader(false)
                    return;
                }
            }
            const info = await fetch('/api/sites/createSiteGroup', {
                method: 'POST',
                 headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

                body: JSON.stringify({
                  groupName,
                  sites: siteArray,
                }),
              });
              
              if (!info.ok) {
                throw new Error(`Failed to create site group: ${info.status} - ${info.statusText}`);
              }
              
              const responseData = await info.json();
              // Use responseData as needed
              
            setTargetKeys([]);
            setSelectedKeys([]);
            setCreateGroupButtonLOader(false);
            setGroupName('');

            console.log("INFOOO", responseData)
            toast({
                description: responseData.message,
                status: responseData.message === 'Group Exists!' ? 'warning' : 'success',
                position: 'top-right',
                duration: 10000,
                isClosable: true,
            });

            getGroups();
        } catch (error) {
            console.error('Error creating group:', error);
            toast({
                description: 'Error creating group',
                status: 'error',
                position: 'top-right',
                duration: 10000,
                isClosable: true,
            });
        }

        getGroups();
    };

    const getSites = async () => {
        setGetSitesLOader(true);
      
        try {
          const apiUrl = '/api/sites/getActiveSites';
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
          setSites(responseData.sites);
          setGetSitesLOader(false);
        } catch (error) {
          console.error('Error fetching sites:', error.message);
        }
      };
      

    const pumpData = sites.map((site) => ({
        key: site._id,
        title: site.pumpName ? site.pumpName : site.name + " (O)",
        description: site.description,
        latitude: site.latitude,    // Include latitude
        longitude: site.longitude,  // Include longitude
    }));

    const handleDeleteGroup = async (groupId) => {
        try {
            await fetch(`/api/sites/deleteGroup`, {
                method: 'POST',
                 headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

                body: JSON.stringify({ groupId }),
              });
              

            toast({
                description: 'Group deleted successfully',
                status: 'success',
                position: 'top-right',
                duration: 10000,
                isClosable: true,
            });

            getGroups();
        } catch (error) {
            console.error('Error deleting group:', error);

            toast({
                description: 'Error deleting group',
                status: 'error',
                position: 'top-right',
                duration: 10000,
                isClosable: true,
            });
        } finally {
            onClose()
        }
    };

    const initialTargetKeys = pumpData.filter((item) => Number(item.key) > 10).map((item) => item.key);

    const onChange = (nextTargetKeys, direction, moveKeys) => {
        setTargetKeys(nextTargetKeys);
    };
    const handleUserChange = (event) => {
        const userId = event.target.value; // Assuming the value is the user ID
        const selectedUserObject = users.find(user => user._id === userId);
        console.log(selectedUserObject)
        setSelectedUser(selectedUserObject);
    };
    const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const handleShowSites = (group) => {
        setCurrentGroup(group);
        onOpen();
    };

    return (
        <Card>
            <CardHeader borderBottomWidth="1px" bg={!emergency ? "teal.600" : "red.500"} color="white" textAlign="center" padding="4">
                <Heading size="md" textTransform="uppercase">
                    {!emergency ? 'Create Groups' : 'Create Group (Emergency Mode)'}
                </Heading>
            </CardHeader>
            <CardBody>
                {getSitesLOader ? (<Loader />) : (
                    <>
                        <Flex justifyContent={'space-between'}>
                            <Heading mb={5} size="sm" textTransform="uppercase">
                                Create Group
                            </Heading>

                            <Flex alignItems={'center'} >
                                <Text fontSize={'1.2em'} whiteSpace='nowrap' mr={3}>Group Name:</Text> <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} w={'50%'} />
                                {emergency && <><Text fontSize={'1.2em'} ml={4} whiteSpace={'nowrap'} mr={3}>Select User:</Text>
                                    <Select
                                        placeholder="Select user"
                                        value={selectedUser ? selectedUser.value : undefined}
                                        onChange={handleUserChange}
                                    >
                                        {users.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.OperatorName}
                                            </option>
                                        ))}
                                    </Select>
                                </>}
                            </Flex>

                            <Heading
                                mb={5}
                                size="sm"
                                backgroundColor={emergency ? 'red.500' : 'rgb(49, 151, 149)'}
                                p='3'
                                onClick={() => setEmergency(!emergency)}
                                color={'white'}
                                textTransform="uppercase"
                            >
                                <Flex alignItems="center">
                                    {emergency ? <FaExclamationTriangle style={{ marginRight: '0.5rem' }} /> : <FaMapMarker style={{ marginRight: '0.5rem' }} />}
                                    {emergency ? "Emergency Route" : "Normal Route"}
                                </Flex>
                            </Heading>

                        </Flex>

                        <Transfer
                            dataSource={pumpData}
                            titles={['Available', 'Groupped']}
                            targetKeys={targetKeys}
                            selectedKeys={selectedKeys}
                            onChange={onChange}
                            onSelectChange={onSelectChange}
                            listStyle={{
                                width: "100%",
                                height: 350,
                            }}
                            render={(item) => item.title}
                            showSearch={{ filter: (inputValue, option) => option.title.toLowerCase().includes(inputValue.toLowerCase()) }}
                        />

                        <Button mt={5} colorScheme={emergency ? 'red' : 'teal'} isLoading={creatgroupbuttonLOader} onClick={handleCreateGroup}>
                            {emergency ? "Create Emergency Group" : "Create Group"}
                        </Button>

                        <Divider mt={7} />

                        <Heading mt={6} size="xs" textTransform="uppercase">
                            Group List
                        </Heading>

                        <Table variant="simple" mt={4}>
                            <thead>
                                <Tr>
                                    <Th>Index</Th>
                                    <Th>GroupName</Th>
                                    <Th>Sites</Th>
                                    <Th>Created At</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </thead>
                            <Tbody>
                                {groups.filter((item)=> item.sites.length != 1).map((group, index) => (
                                    <Tr key={group._id}>
                                        <Td>{index + 1}</Td>
                                        <Td>{group.groupName}</Td>
                                        <Td>
                                            <Tooltip label={group.sites.join(', ')} placement="right-end">
                                                <span>{`${group.sites.length} sites`}</span>
                                            </Tooltip>
                                        </Td>
                                        <Td>{new Date(group.creationDate).toLocaleString()}</Td>
                                        <Td>
                                            <Button colorScheme="teal" size="sm" onClick={() => handleShowSites(group)}>
                                                Show Sites
                                            </Button>

                                            <Popconfirm
                                                title="Delete the task"
                                                description="Are you sure to delete this task?"
                                                onConfirm={() => handleDeleteGroup(group._id)}
                                                onCancel={cancel}
                                                okText="Delete"
                                                cancelText="No"
                                            >
                                                <Button size="sm" ml={2} colorScheme="red" >Delete Group</Button>
                                            </Popconfirm>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {currentGroup && (
                          <Modal isOpen={isOpen} onClose={onClose}>
                          <ModalOverlay />
                          <ModalContent>
                              <ModalHeader>{`Sites for Group: ${currentGroup.groupName}`}</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                  <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
                                      {currentGroup.sites.map((site, index) => (
                                          <Card key={site.siteId} p={3} boxShadow="md">
                                            {console.log("OIO", site)}
                                              <Heading size="md" mb={2}>{site.pumpName ? site.pumpName : site.name+" (O)"}</Heading>
                                              <Text fontSize="sm" color="gray.500" mb={2}>{site.description}</Text>
                                              <Flex align="center" mb={2}>
                                                  <FaMapMarker style={{ marginRight: '0.5rem' }} />
                                                  <Text fontSize="sm">{`Location: (${site.latitude}, ${site.longitude})`}</Text>
                                              </Flex>
                                          </Card>
                                      ))}
                                  </Grid>
                              </ModalBody>
                              <ModalFooter>
                                  <Button colorScheme="teal" onClick={onClose}>
                                      Close
                                  </Button>
                              </ModalFooter>
                          </ModalContent>
                      </Modal>
                      
                        )}
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default CreateGroups;
