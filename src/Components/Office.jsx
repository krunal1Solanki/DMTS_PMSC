"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    Badge,
    IconButton,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Button,
    useToast,
    Flex,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    FormControl,
    FormLabel,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';  // Import icons for delete and edit buttons

const Office = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        state: '',
        block: '',
        latitude: '',
        longitude: '',
        address: '',
        pincode: '',
        inChargeName: '',
        inChargeMobile: '',
    });
    const resetData = () => setFormData({
        name: '',
        state: '',
        block: '',
        latitude: '',
        longitude: '',
        address: '',
        pincode: '',
        inChargeName: '',
        inChargeMobile: '',
    })

    const [officeData, setOfficeData] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState(null);  // State to store the selected office for update
    const toast = useToast();

    useEffect(() => {
        fetchOfficeData();
    }, []);

    const fetchOfficeData = async () => {
        try {
          const apiUrl = '/api/setting/getOffice';
          const response = await fetch(apiUrl, {
             headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch office data: ${response.status} - ${response.statusText}`);
          }
      
          const responseData = await response.json();
          setOfficeData(responseData.data);
        } catch (error) {
          console.error('Error fetching office data:', error.message);
        }
      };
      

    const handleAddOffice = async () => {
        // Validation
        if (!formData.name || !formData.state || !formData.block || !formData.latitude || !formData.longitude || !formData.address || !formData.pincode || !formData.inChargeName || !formData.inChargeMobile) {
            toast({
                title: 'Validation Error',
                description: 'Please fill in all the required fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            // API call to add a new office
            const apiUrl = '/api/setting/addOffice';
            const response = await fetch(apiUrl, {
              method: 'POST',
               headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

              body: JSON.stringify(formData),
            });
          
            if (!response.ok) {
              throw new Error(`Failed to add office: ${response.status} - ${response.statusText}`);
            }
          
            const responseData = await response.json();
            console.log(responseData.message);
          
            // Close the modal
            setIsModalOpen(false);
          
            // Reset form data after successful submission
            setFormData({
              name: '',
              state: '',
              block: '',
              latitude: '',
              longitude: '',
              address: '',
              pincode: '',
              inChargeName: '',
              inChargeMobile: '',
            });
          
            // Fetch updated office data
            fetchOfficeData();
          
            // Show success toast
            toast({
              title: 'Office Added',
              description: 'The office has been successfully added.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          } catch (error) {
            console.error('Error adding office:', error.message);
            // Show error toast
            toast({
              title: 'Error',
              description: 'An error occurred while adding the office.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
          
    };

    const handleUpdateOffice = async () => {
        // Validation
        if (!formData.name || !formData.state || !formData.block || !formData.latitude || !formData.longitude || !formData.address || !formData.pincode || !formData.inChargeName || !formData.inChargeMobile) {
            toast({
                title: 'Validation Error',
                description: 'Please fill in all the required fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        formData.officeId = selectedOffice;
        try {
            // API call to update the selected office
            const apiUrl = '/api/setting/editOffice';
            const response = await fetch(apiUrl, {
              method: 'POST',
               headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

              body: JSON.stringify(formData),
            });
          
            if (!response.ok) {
              throw new Error(`Failed to update office: ${response.status} - ${response.statusText}`);
            }
          
            const responseData = await response.json();
            console.log(responseData.message);
          
            // Close the modal
            setIsModalOpen(false);
          
            // Reset form data after successful submission
            setFormData({
              name: '',
              state: '',
              block: '',
              latitude: '',
              longitude: '',
              address: '',
              pincode: '',
              inChargeName: '',
              inChargeMobile: '',
            });
          
            // Fetch updated office data
            fetchOfficeData();
          
            // Show success toast
            toast({
              title: 'Office Updated',
              description: 'The office has been successfully updated.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          } catch (error) {
            console.error('Error updating office:', error.message);
            // Show error toast
            toast({
              title: 'Error',
              description: 'An error occurred while updating the office.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          } finally {
            setSelectedOffice(null);
            resetData();
          }
          
    };

    const handleDeleteOffice = async (officeId) => {
        try {
          // API call to delete the office
          const apiUrl = `/api/setting/deleteOffice`;
          await fetch(apiUrl, {
            method: 'POST',
             headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
            body: JSON.stringify({ officeId }),
          });
      
          // Fetch updated office data
          fetchOfficeData();
      
          // Show success toast
          toast({
            title: 'Office Deleted',
            description: 'The office has been successfully deleted.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          console.error(error.message);
          // Show error toast
          toast({
            title: 'Error',
            description: 'An error occurred while deleting the office.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      };
      

    const handleEditOffice = (office) => {
        // Set the selected office data to the form data
        setFormData({
            name: office.name,
            state: office.state,
            block: office.block,
            latitude: office.latitude,
            longitude: office.longitude,
            address: office.address,
            pincode: office.pincode,
            inChargeName: office.inChargeName,
            inChargeMobile: office.inChargeMobile,
        });

        // Set the selected office for updating
        setSelectedOffice(office);

        // Open the modal
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
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
                <Flex justifyContent="space-between">
                    <Heading size="md" textTransform="uppercase">
                        {'Office'}
                    </Heading>
                    <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
                        Add Office
                    </Button>
                </Flex>
            </CardHeader>
            <CardBody>
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>State</Th>
                            <Th>Block</Th>
                            <Th>Latitude</Th>
                            <Th>Longitude</Th>
                            <Th>Address</Th>
                            <Th>Pincode</Th>
                            <Th>In Charge Name</Th>
                            <Th>In Charge Mobile</Th>
                            <Th>Actions</Th> {/* Added Actions column */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {officeData.map((office) => (
                            <Tr key={office._id}>
                                <Td>{office.name}</Td>
                                <Td>{office.state}</Td>
                                <Td>{office.block}</Td>
                                <Td>{office.latitude}</Td>
                                <Td>{office.longitude}</Td>
                                <Td>{office.address}</Td>
                                <Td>{office.pincode}</Td>
                                <Td>{office.inChargeName}</Td>
                                <Td>{office.inChargeMobile}</Td>
                                <Td>
                                <Flex align="center">
                                        <IconButton
                                            colorScheme="red"
                                            size="sm"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                            onClick={() => handleDeleteOffice(office._id)}
                                            mr={2}
                                        />
                                        <IconButton
                                            colorScheme="teal"
                                            size="sm"
                                            aria-label="Update"
                                            icon={<EditIcon />}
                                            onClick={() => handleEditOffice(office)}
                                        />
                                    </Flex>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </CardBody>
            <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); setSelectedOffice(null)}}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedOffice ? 'Update Office' : 'Add Office'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="Enter office name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>State</FormLabel>
                            <Select
                                placeholder="Select state"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                            >
                                {allIndianStates.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Block</FormLabel>
                            <Input
                                placeholder="Enter block"
                                name="block"
                                value={formData.block}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Latitude</FormLabel>
                            <Input
                                type="number"
                                placeholder="Enter latitude"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Longitude</FormLabel>
                            <Input
                                type="number"
                                placeholder="Enter longitude"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Address</FormLabel>
                            <Input
                                placeholder="Enter address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Pincode</FormLabel>
                            <Input
                                placeholder="Enter pincode"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>In Charge Name</FormLabel>
                            <Input
                                placeholder="Enter in charge name"
                                name="inChargeName"
                                value={formData.inChargeName}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>In Charge Mobile</FormLabel>
                            <Input
                                placeholder="Enter in charge mobile"
                                name="inChargeMobile"
                                value={formData.inChargeMobile}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" mr={3} onClick={() => setIsModalOpen(false)}>
                            Close
                        </Button>
                        <Button colorScheme="teal" onClick={selectedOffice ? handleUpdateOffice : handleAddOffice}>
                            {selectedOffice ? 'Update' : 'Save'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Card>
    );
};

const allIndianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
];

export default Office ;
