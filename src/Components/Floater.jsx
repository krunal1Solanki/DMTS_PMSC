"use client"
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID package
import { FloatButton } from 'antd';
import { CustomerServiceOutlined, LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Box, useToast, Input, Button, Grid, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, VStack, Select, Textarea, FormControl, FormLabel, FormHelperText, IconButton, Stack, Text, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { FaFile, FaPaperPlane } from 'react-icons/fa';
import { QuestionIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const Floater = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [querySubject, setQuerySubject] = useState('');
  const [queryDescription, setQueryDescription] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('low'); // Default priority
  const [attachments, setAttachments] = useState([]);
  const [complaintSource, setComplaintSource] = useState(''); // Default complaint source
  const [complaintPhoneNumber, setComplaintPhoneNumber] = useState('');
  const userReducer = useSelector((state) => state.userReducer);
  const siteReducer = useSelector((state) => state.siteReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const [users, setUsers] = useState(userReducer.value.users || []);
  const [sites, setSites] = useState(siteReducer.value.sites || []);
  const [siteOptions, setSiteOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [siteDetails, setSiteDetails] = useState(null);
  const [complaintNumber, setComplaintNumber] = useState(uuidv4());

  useEffect(() => {
    console.log("XOX", complaintNumber)
  }, [complaintNumber])

  useEffect(() => {
    setUsers(userReducer.value.users);
  }, [userReducer]);

  useEffect(() => {
    setSites(siteReducer.value.sites);
  }, [siteReducer]);

  useEffect(() => {
    if (sites && sites.length > 0) {
      const updatedSiteOptions = sites.map((site) => site.pumpName) || [];
      console.log("SITES", { sites })
      setSiteOptions(updatedSiteOptions);
    }
  }, [sites]);

  useEffect(() => {
    setDetailsFun();
  }, [selectedSite])

  const setDetailsFun = () => {
    console.log(sites, selectedSite)
    let found = false;
    for (let i = 0; i < sites.length; i++) {
      if (sites[i].pumpName == selectedSite) {
        setSiteDetails(sites[i])
        found = true;
      }
    }
    if (!found) setSiteDetails('')
  }
  useEffect(() => {
    // Update userOptions when 'users' change
    if (users && users.length > 0) {
      const updatedUserOptions = users?.map((user) => user.OperatorName) || [];
      setUserOptions(updatedUserOptions);
    }
  }, [users]);

  const router = useRouter();

  const handleOpenModal = () => {
    setIsOpen(true);
    console.log("XOX OPENING", uuidv4())
    // Generate and set complaint number when modal opens
    setComplaintNumber(uuidv4());
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedSite('');
    setSelectedUser('');
    setQuerySubject('');
    setQueryDescription('');
    setSelectedPriority('low');
    setAttachments([]);
    setComplaintSource(''); // Clear complaint source
    setComplaintPhoneNumber(''); // Clear complaint phone number
  };

  const handleQuerySubmit = async () => {
    try {
      // Basic validation
      if (!selectedSite || !selectedUser || !querySubject || !queryDescription || !selectedPriority || !complaintSource || !complaintPhoneNumber) {
        toast({
          title: 'Incomplete Form',
          description: 'Please fill in all required fields.',
          duration: 2000,
          status: 'warning',
        });
        return;
      }

      if (complaintPhoneNumber.length != 10) {
        toast({
          title: 'Phone number is invalid!',
          description: 'Length of phone number should be 10.',
          duration: 2000,
          status: 'warning',
        });
        return;
      }



      const formData = new FormData();
      formData.append('selectedSite', selectedSite);
      formData.append('selectedUser', selectedUser);
      formData.append('querySubject', querySubject);
      formData.append('queryDescription', queryDescription);
      formData.append('selectedPriority', selectedPriority);
      formData.append('siteDetails', JSON.stringify(siteDetails?.address || {})); // Make sure siteDetails is not null
      formData.append('attachments', attachments);
      formData.append('complaintSource', complaintSource);
      formData.append('complaintPhoneNumber', complaintPhoneNumber);
      formData.append('complaintNumber', complaintNumber.toUpperCase().substr(complaintNumber.length - 8)); // Pass complaint number to API

      const userCurr = { name: authReducer.value.user.OperatorName, _id: authReducer.value.user._id };
      formData.append('responsibleUser', JSON.stringify(userCurr));
      const info = await axios.post('/api/setting/raiseQuery', formData);
      
      // Use responseData as needed

      toast({
        title: "Query Submitted",
        description: "Your query has been raised successfully",
        duration: 2000,
        position: 'top-right',
        status: 'success',
        render: ({ onClose }) => (
          <Box onClick={onClose} p={3} color="white" bg="green.500" borderRadius="md" cursor="pointer">
            <CheckCircleIcon mr={2} /> Query submitted successfully!
          </Box>
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        duration: 2000,
        status: 'error',
        render: ({ onClose }) => (
          <Box onClick={onClose} p={3} color="white" bg="red.500" borderRadius="md" cursor="pointer">
            <WarningIcon mr={2} /> Error submitting query: {error.message}
          </Box>
        ),
      });
    }
    handleCloseModal();
  };

  const handleLogout = async () => {
    try {
      const apiUrl = '/api/user/logout';
      await fetch(apiUrl, {
         headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },

      });
  
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
        duration: 2000,
        position: 'top-right',
        status: 'success',
      });
  
      router.push('/login');
    } catch (error) {
      console.error('Logout Error:', error.message);
    }
  };
  

  return (
    <Box>
      {/* Display complaint number at the top */}

      <FloatButton.Group
        trigger="hover"
        type='default'
        style={{
          right: 20,
          bottom: 30,
        }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton onClick={handleOpenModal} icon={<QuestionCircleOutlined />} />
        <FloatButton onClick={handleLogout} icon={<LogoutOutlined />} />
      </FloatButton.Group>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent borderRadius="md">
          <ModalHeader textAlign="center" borderBottom="1px" pb={2}>
            Raise Complaint
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text fontWeight="bold" textAlign="center" color="teal" mb={4} fontSize="xl">
                Complaint ID: <Text as="span" color="gray.600" fontWeight="normal">{`${complaintNumber.toUpperCase().substr(complaintNumber.length - 8)}`}</Text>
              </Text>


              <FormControl>
                <FormLabel>Site</FormLabel>
                <Select
                  placeholder="Select Site"
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                >
                  {siteOptions?.map((site) => (
                    <option key={site} value={site}>
                      {site}
                    </option>
                  ))}
                </Select>
              </FormControl>
              {siteDetails && typeof siteDetails != "string" && (
                <Box>
                  <Grid templateColumns="repeat(2, 1fr)" gap={2}>
                    <FormControl>
                      <FormLabel>Block</FormLabel>
                      <Input isReadOnly value={siteDetails.address.block || "Not Added"} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>District</FormLabel>
                      <Input isReadOnly value={siteDetails.address.district || "Not Added"} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Panchayat</FormLabel>
                      <Input isReadOnly value={siteDetails.address.panchayat || "Not Added"} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>State</FormLabel>
                      <Input isReadOnly value={siteDetails.address.state || "Not Added"} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Village</FormLabel>
                      <Input isReadOnly value={siteDetails.address.village || "Not Added"} />
                    </FormControl>
                  </Grid>
                </Box>
              )}
              <FormControl>
                <FormLabel>Assign To</FormLabel>
                <Select
                  placeholder="Select User"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  {userOptions?.map((user) => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Subject</FormLabel>
                <Input
                  placeholder="Subject"
                  value={querySubject}
                  onChange={(e) => setQuerySubject(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Query Description"
                  value={queryDescription}
                  onChange={(e) => setQueryDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Priority</FormLabel>
                <Select
                  placeholder="Select Priority"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Complaint Source</FormLabel>
                <Select
                  placeholder="Select Complaint Source"
                  value={complaintSource}
                  onChange={(e) => setComplaintSource(e.target.value)}
                >
                  <option value="Government">Government</option>
                  <option value="Self">Self</option>
                  <option value="Public">Public</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Complaint Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+91" />
                  <Input
                    type="tel"
                    placeholder="Complaint Phone Number"
                    value={complaintPhoneNumber}
                    onChange={(e) => setComplaintPhoneNumber(e.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Attachments</FormLabel>
                <Stack direction="row" spacing={2} align="center">
                  <Input type="file" accept="image/*" onChange={(e) => setAttachments(e.target.files[0])} />
                  <IconButton
                    icon={<FaFile />}
                    aria-label="View Attachments"
                    onClick={() => { /* Add functionality to view attachments if needed */ }}
                  />
                </Stack>
                <FormHelperText>Attach any relevant files (if needed)</FormHelperText>
              </FormControl>
              <Button
                mt={3}
                leftIcon={<FaPaperPlane />}
                colorScheme="teal"
                onClick={handleQuerySubmit}
              >
                Submit Query
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Floater;
