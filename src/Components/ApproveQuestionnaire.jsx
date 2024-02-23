"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, HStack, Divider, Image, Heading, Flex, Button } from '@chakra-ui/react';
import { StarIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Checkbox, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'; // Add Chakra UI components
import { AiOutlineSearch } from 'react-icons/ai'; // Assuming you have the Ant Design icons

const ApproveQuestionnaire = () => {
    const [questionnaires, setQuestionnaires] = useState([]);
    const [filterOption, setFilterOption] = useState('all'); // 'all' is the default value
    const [userNameSearch, setUserNameSearch] = useState('');
    const [formTypeFilter, setFormTypeFilter] = useState('all');
    useEffect(() => {
        getQuestionnaires();
    }, []);

    const getQuestionnaires = async () => {
        try {
          const apiUrl = "/api/setting/getAnsweredQuestionnaire";
          const response = await fetch(apiUrl, {
            cache : 'no-store',

          });
      
          if (!response.ok) {
            throw new Error(`Failed to fetch answered questionnaires: ${response.status} - ${response.statusText}`);
          }
      
          const responseData = await response.json();
          console.log("RESOOOO", responseData.message);
          setQuestionnaires(responseData.message);
        } catch (error) {
          console.error("Error fetching questionnaires:", error);
        }
      };
      

    const approveOnm = async (id) => {
        try {
          const apiUrl = `/api/setting/approveOnm/${id}`;
          const response = await fetch(apiUrl, {
            cache : 'no-store',

          });
      
          if (!response.ok) {
            throw new Error(`Failed to approve ONM questionnaire: ${response.status} - ${response.statusText}`);
          }
      
          await getQuestionnaires();
          // Handle the response if needed
          const responseData = await response.json();
          console.log('Approval response:', responseData);
      
          // Show a success toast or perform other actions
          toast({
            description: 'ONM questionnaire approved successfully',
            status: 'success',
            position: 'top-right',
            duration: 10000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Error approving ONM questionnaire:', error);
          // Handle the error, show an error toast, or perform other actions
        }
      };
      
    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    const handleUserNameSearch = (e) => {
        setUserNameSearch(e.target.value);
    };
    const handleFormTypeFilterChange = (e) => {
        setFormTypeFilter(e.target.value);
    };


    const renderCard = (questionnaire) => {
        const isApproved = questionnaire.isApproved || filterOption === 'all';
        const isMatchingFormType = questionnaire.formType === formTypeFilter || formTypeFilter === 'all';
        console.log(questionnaire.formType, formTypeFilter)

        if ((!isApproved) || (!isMatchingFormType) ||
            (userNameSearch && !questionnaire.userName.toLowerCase().includes(userNameSearch.toLowerCase()))) {
            return null;
        }

        return (
            <Box
                key={questionnaire._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                mb={8}
                boxShadow="lg"
                bg="white"
            >
                <Flex alignItems='center' justifyContent={'space-between'}>
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {questionnaire.userName}
                </Text>
                {questionnaire.isApproved ? (
                    <CheckIcon color="green.500" boxSize={6} />
                ) : (
                    <Button colorScheme="teal" onClick={() => approveOnm(questionnaire._id)}>
                        Approve
                    </Button>
                )}
                </Flex>
                <Divider mt={2} mb={2}/>
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {questionnaire.questionnaireName}
                </Text>
                <Text fontSize="sm" color="gray.500" mb={4}>
                    Created on {new Date(questionnaire.creationDate).toLocaleString()}
                </Text>
                <Text>
                        {questionnaire.images.map((image) => (
                      <>
                      <Text mb={4}>
                        {image.imageName} : 
                      </Text>
                      <Image
                                key={image._id}
                                src={`data:image/png;base64,${image.answer}`} // Assuming 'answer' contains the image URL
                                alt={image.imageName}
                                mb={4}
                                borderRadius="md"
                                boxShadow="md"
                                style={{ maxHeight: '200px', maxWidth: '100%' }} // Set maximum height and maximum width
                            />
                      </>
                        ))}
                    </Text>
                    <Divider/>
                <VStack mt={2} align="start" spacing={4}>
                    <Heading size={'md'}>Questions : </Heading>
                    {questionnaire.questions.map((question) => (
                        <Box key={question._id} w="100%">
                            {question.answerType === 'text' && (
                                <>
                                    <Text fontSize="md">{question.questionText}</Text>
                                    <Text fontSize="sm" mt={1}>{question.answer}</Text>
                                </>
                            )}
                            {question.answerType === 'rating' && (
                                <>
                                    <Text fontSize="md">{question.questionText}</Text>
                                    <HStack mt={1} spacing={2}>
                                        {[...Array(Number(question.answer))].map((_, index) => (
                                            <StarIcon key={index} color="yellow.500" boxSize={5} />
                                        ))}
                                    </HStack>
                                </>
                            )}
                            {question.answerType === 'yesno' && (
                                <>
                                    <Text fontSize="md">{question.questionText}</Text>
                                    <HStack mt={1} spacing={2}>
                                        {question.answer === 'YES' ? (
                                            <CheckIcon color="green.500" boxSize={6} />
                                        ) : (
                                            <CloseIcon color="red.500" boxSize={6} />
                                        )}
                                    </HStack>
                                </>
                            )}
                        </Box>
                    ))}
                </VStack>
            </Box>
        );
    };

    return (
        <Box>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Approve Questionnaires
            </Text>

            <HStack mb={4} spacing={4} align="center">
                <Select value={filterOption} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="approved">Show only approved</option>
                    <option value="pending">Show only pending</option>
                </Select>

                <Select value={formTypeFilter} onChange={handleFormTypeFilterChange}>
                    <option value="all">All Forms</option>
                    <option value="ONM">ONM</option>
                    <option value="Survey">Survey</option>
                </Select>

                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <AiOutlineSearch color="gray.300" />
                    </InputLeftElement>
                    <Input
                        type="text"
                        placeholder="Search by user name"
                        value={userNameSearch}
                        onChange={handleUserNameSearch}
                    />
                </InputGroup>
            </HStack>

            {questionnaires.map((questionnaire) => renderCard(questionnaire))}
        </Box>
    );
};

export default ApproveQuestionnaire;
