"use client"
import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { Segmented } from 'antd';
import QuestionnaireDisplay from './QuestionnaireDisplay';
import AddQuestionnaire from './AddQuestionnaire';
import ApproveQuestionnaire from './ApproveQuestionnaire'

const Questionnaire = () => {

  const [selectedComponent, setSelectedComponent] = useState('QuestionnaireDisplay'); // Initialize with string

  const handleSegmentChange = (value) => {
    // Update the selected component based on the segmented control value
    setSelectedComponent(value);
  };

  // Initialize components
  const components = {
    'QuestionnaireDisplay': QuestionnaireDisplay,
    'AddQuestionnaire': AddQuestionnaire,
    'ApproveQuestionnaire' : ApproveQuestionnaire
  };

  const SelectedComponent = components[selectedComponent]; // Select component based on state

  return (
    <Card>
      <CardHeader
        bg="teal"
        borderBottomWidth="1px"
        borderColor="teal.600"
        color="white"
        textAlign="center"
        padding="4"
      >
        <Flex align="center" justify="space-between">
          <Heading size="md" textTransform="uppercase">
            <Segmented
              options={[
                { label: 'View', value: 'QuestionnaireDisplay' },
                { label: 'Add', value: 'AddQuestionnaire' },
                {label : 'Approve', value : 'ApproveQuestionnaire'}
              ]}
              value={selectedComponent}
              onChange={handleSegmentChange}
            />
          </Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <SelectedComponent />
      </CardBody>
    </Card>
  );
};

export default Questionnaire;
