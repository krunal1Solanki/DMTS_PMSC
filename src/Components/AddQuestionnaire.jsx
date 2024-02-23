"use client"
import React, { useState } from 'react';
import {
    Box,
    Input,
    FormControl,
    Divider,
    Button,
    VStack,
    Heading,
    FormLabel,
    Flex,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    TabPanels,
    Select,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import Loader from './LOader';
import QuestionnaireDisplay from './QuestionnaireDisplay';

const AddQuestionnaire = () => {
    const toast = useToast();
    const [questionnaire, setQuestionnaire] = useState({
        questionnaireName: '',
        questions: [{ questionText: '', answerType: 'rating' }],
        images: [{ imageName: '' }],
    });
    const [Loaders, setLoaders] = useState(false);
    const [type, setType] = useState('ONM');
    const [tabIndex, setTabIndex] = useState(0);

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questionnaire.questions];
        updatedQuestions[index][field] = value;
        setQuestionnaire({ ...questionnaire, questions: updatedQuestions });
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handleImageChange = (index, field, value) => {
        const updatedImages = [...questionnaire.images];
        updatedImages[index][field] = value;
        setQuestionnaire({ ...questionnaire, images: updatedImages });
    };

    const addQuestion = () => {
        setQuestionnaire({
            ...questionnaire,
            questions: [
                ...questionnaire.questions,
                { questionText: '', answerType: 'rating' },
            ],
        });
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...questionnaire.questions];
        updatedQuestions.splice(index, 1);
        setQuestionnaire({ ...questionnaire, questions: updatedQuestions });
    };

    const addQuestionnaire = async () => {
        setLoaders(true);
      
        try {
          questionnaire.type = type;
          const apiUrl = '/api/setting/addQuestionnaire';
          const response = await fetch(apiUrl, {
            method: 'POST',
            cache : 'no-store',

            body: JSON.stringify(questionnaire),
          });
      
          if (!response.ok) {
            throw new Error(`Failed to add questionnaire: ${response.status} - ${response.statusText}`);
          }
      
          // Assuming the API returns the saved questionnaire
          const savedQuestionnaire = await response.json();
      
          setQuestionnaire({
            questionnaireName: '',
            questions: [{ questionText: '', answerType: 'rating' }],
            images: [],
          });
      
          toast({
            description: 'Questionnaire added successfully',
            status: 'success',
            position: 'top-right',
            duration: 10000,
            isClosable: true,
          });
      
          console.log('Saved Questionnaire:', savedQuestionnaire);
          setLoaders(false);
        } catch (error) {
          console.error('Error adding questionnaire:', error);
        }
      };
      

    const addImage = () => {
        setQuestionnaire({
            ...questionnaire,
            images: [...questionnaire.images, { imageName: '' }],
        });
    };

    const removeImage = (index) => {
        const updatedImages = [...questionnaire.images];
        updatedImages.splice(index, 1);
        setQuestionnaire({ ...questionnaire, images: updatedImages });
    };

    return (
        <Box>

            {/* Add Questionnaire Form */}
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Select Type:</FormLabel>
                    <Select value={type} onChange={handleTypeChange}>
                        <option value="ONM">ONM</option>
                        <option value="Survey">Survey</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>{type} Name:</FormLabel>
                    <Input
                        type="text"
                        value={questionnaire.questionnaireName}
                        onChange={(e) =>
                            setQuestionnaire({
                                ...questionnaire,
                                questionnaireName: e.target.value,
                            })
                        }
                    />
                </FormControl>
            </VStack>

            <Flex justify="space-between">
                <VStack spacing={4} w="48%">
                    <Heading size="md">Questions</Heading>
                    {questionnaire.questions.map((question, index) => (
                        <Box key={index} borderWidth="1px" w="100%" p={4} borderRadius="lg">
                            <FormControl mb={2}>
                                <FormLabel>Answer Type:</FormLabel>
                                <Select
                                    required
                                    value={question.answerType}
                                    onChange={(e) => handleQuestionChange(index, 'answerType', e.target.value)}
                                >
                                    <option value="rating">Rating</option>
                                    <option value="yesno">Yes/No</option>
                                    <option value="text">Text</option>
                                </Select>
                            </FormControl>
                            <FormLabel>Question Text:</FormLabel>
                            <Input
                                type="text"
                                required
                                value={question.questionText}
                                onChange={(e) =>
                                    handleQuestionChange(index, 'questionText', e.target.value)
                                }
                            />
                            <Button onClick={() => removeQuestion(index)} colorScheme="red" mt={4}>
                                Remove Question
                            </Button>
                        </Box>
                    ))}
                </VStack>

                {/* Images */}
                <VStack spacing={4} w="48%">
                    <Heading size="md">Images</Heading>
                    {questionnaire.images.map((image, index) => (
                        <Box key={index} borderWidth="1px" w="100%" p={4} borderRadius="md">
                            <FormControl mb={2}>
                                <FormLabel>Image Name:</FormLabel>
                                <Input
                                    type="text"
                                    value={image.imageName}
                                    onChange={(e) =>
                                        handleImageChange(index, 'imageName', e.target.value)
                                    }
                                />
                            </FormControl>
                            {/* You can add an input for uploading images here */}
                            <Button onClick={() => removeImage(index)} colorScheme="red" mt={4}>
                                Remove Image
                            </Button>
                        </Box>
                    ))}
                </VStack>
            </Flex>

            <Divider mt={4} />

            <VStack spacing={4} mt={8}>
                <div
                    style={{
                        marginTop: '20px',
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: '10px',
                    }}
                >
                    <Button onClick={addQuestion} colorScheme="teal">
                        Add Question
                    </Button>
                    <Button onClick={addImage} colorScheme="teal">
                        Add Image
                    </Button>

                    <Button onClick={addQuestionnaire} isLoading={Loaders} colorScheme="teal">
                        Submit
                    </Button>
                </div>
            </VStack>
        </Box>
    );
};

export default AddQuestionnaire;
