"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  IconButton,
  Tooltip,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';
import Loader from './LOader';

const QuestionnaireDisplay = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [answerTypeFilter, setAnswerTypeFilter] = useState('');
  const [formTypeFilter, setFormTypeFilter] = useState('');
  const [LOader, setLOader] = useState(false);
  const [originalQuestionnaires, setOriginalQuestionnaires] = useState([]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, answerTypeFilter, formTypeFilter]);

  const fetchData = () => {
    setLOader(true);
    const filteredQuestionnaires = originalQuestionnaires.filter(
      (questionnaire) =>
        questionnaire.questionnaireName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (answerTypeFilter === '' || questionnaire.questions.some(question => question.answerType === answerTypeFilter)) &&
        (formTypeFilter === '' || questionnaire.formType === formTypeFilter)
    );

    setQuestionnaires(filteredQuestionnaires);
    setLOader(false);
  };

  useEffect(() => {
    const fetchOriginalData = async () => {
      setLOader(true);
      try {
        const apiUrl = '/api/setting/getQuestionnaire';
        const response = await fetch(apiUrl, {
          method: 'GET',
          cache : 'no-store',

        });
      
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} - ${response.statusText}`);
        }
      
        const responseData = await response.json();
        setOriginalQuestionnaires(responseData.message);
        setQuestionnaires(responseData.message);
        setLoader(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
      
    };

    fetchOriginalData();
  }, []);

  const deleteQuestionnaire = async (questionnaireId) => {
    try {
      const apiUrl = '/api/setting/deleteQuestionnaire';
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        cache : 'no-store',
        body: JSON.stringify({ questionnaireId }),
      });
  
      if (!response.ok) {
        console.error(`Error deleting questionnaire: ${response.status} - ${response.statusText}`);
      } else {
        fetchData(); // Assuming fetchData is a function to refresh data
      }
    } catch (error) {
      console.error('Error deleting questionnaire:', error);
    }
  };
  
  

  return (
    <VStack spacing={4} align="start" p={4} w="100%">
      <HStack w="100%" justify="space-between" mb={4}>
        <HStack spacing={4}>
          <SearchIcon color="gray.300" />
          <input
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </HStack>
        <HStack spacing={4}>
          <Text>Filter by Answer Type:</Text>
          <select
            value={answerTypeFilter}
            onChange={(e) => setAnswerTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="rating">Rating</option>
            <option value="yesno">Yes/No</option>
            <option value="text">Text</option>
          </select>
        </HStack>
        <HStack spacing={4}>
          <Text>Filter by Form Type:</Text>
          <select
            value={formTypeFilter}
            onChange={(e) => setFormTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="ONM">ONM</option>
            <option value="Survey">Survey</option>
          </select>
        </HStack>
      </HStack>
      {LOader ? (<Loader />) : (
        <>
          <VStack spacing={4} align="start" w="100%">
            {questionnaires.map((questionnaire, index) => (
              <Box
                key={questionnaire._id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="lg"
                w="100%"
              >
                <Text fontWeight="bold" fontSize="xl">
                  {questionnaire.formType || 'Untitled Questionnaire'}
                </Text>
                <Divider mt={3}/>
                <Text fontWeight="bold" fontSize="xl">
                  {questionnaire.questionnaireName || 'Untitled Questionnaire'}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Date: {new Date(questionnaire.creationDate).toLocaleDateString()}
                </Text>
                <Divider my={2} />
                <Text fontWeight="bold">
                  Questions:
                </Text>
                <VStack align="start" spacing={2} w="100%">
                  {questionnaire.questions.map((question, qIndex) => (
                    <Flex key={question._id} justify="space-between" w="100%">
                      <Text>{qIndex + 1}. {question.questionText}</Text>
                      <Badge colorScheme="blue" fontSize="xs">
                        {question.answerType}
                      </Badge>
                    </Flex>
                  ))}
                </VStack>
                <Divider my={2} />
                <Text fontWeight="bold">
                  Image:
                </Text>
                <VStack align="start" spacing={2} w="100%">
                  {questionnaire.images.map((question, qIndex) => (
                    <Flex key={question._id} justify="space-between" w="100%">
                      <Text>{qIndex + 1}. {question.imageName}</Text>
                    </Flex>
                  ))}
                </VStack>
                <Tooltip label="Delete" hasArrow>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    size="sm"
                    onClick={() => deleteQuestionnaire(questionnaire._id)}
                    mt={4}
                  />
                </Tooltip>
              </Box>
            ))}
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default QuestionnaireDisplay ;