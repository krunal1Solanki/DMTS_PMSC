"use client"
import { Box, Flex, Heading, SimpleGrid, Card, CardBody, CardHeader, Select } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';
import { registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
Chart.register(...registerables);

const Scheduler = () => {
  const colors = ['#FF6384', '#36A2EB', '#FFCE56'];

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedSites, setSelectedSites] = useState([]);
  const [site, setSite] = useState('')

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // Fetch sites only if the selected project is not 'ALL'
    if (selectedProject !== 'ALL') {
      const selectedProjectData = projects.find((item) => item.project._id === selectedProject);
      setSelectedSites(selectedProjectData ? selectedProjectData.sites : []);
    } else {
      // Clear sites when 'All Projects' is selected
      setSelectedSites([]);
    }
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const apiUrl = 'api/project/getProjectSitesAssignedList';
      const response = await fetch(apiUrl, {
        cache : 'no-store',

      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.status} - ${response.statusText}`);
      }
  
      const responseData = await response.json();
      const filteredProjects = responseData.projects.filter((item) => item.project && item.sites.length > 0);
      setProjects(filteredProjects);
    } catch (error) {
      console.error(error);
    }
  };
  
  const dataQuestionnaire = {
    labels: ['Completed', 'Pending', 'Total'],
    datasets: [
      {
        data: [20, 10, 30], // Replace with your actual counts for the questionnaire
        backgroundColor: colors,
        hoverBackgroundColor: ['#FF1255', '#1E90FF', '#FFD700'],
      },
    ],
  };

  const dataSurveys = {
    labels: ['Completed', 'Pending', 'Total'],
    datasets: [
      {
        data: [20, 10, 30], // Replace with your actual counts for surveys
        backgroundColor: ['#0088FE', '#FF8042', '#00C49F'],
        hoverBackgroundColor: ['#0056b3', '#b35b00', '#00845c'],
      },
    ],
  };

  return (
    <Box minHeight="100vh" p="4">
      <Flex mt={4}>
        <Select
          bg="teal.500"
          borderColor="teal.500"
          value={selectedProject}
          w={'15%'}
          onChange={(e) => setSelectedProject(e.target.value)}
          color="white"
        >
          <option value={'ALL'}>All Projects</option>
          {projects.map((item) => (
            <option key={item.project._id} value={item.project._id}>
              {item.project.ProjectName}
            </option>
          ))}
        </Select>
        {selectedProject !== 'ALL' && (
          <Select
            bg="teal.500"
            borderColor="teal.500"
            w={'15%'}
            ml={2}
            value={site}
            onChange={(e) => setSite(e.target.value)}
            color="white"
          >
            <option value={'ALL'}>All Sites</option>
            {selectedSites.map((site) => (
              <option key={site._id} value={site._id}>
                {site.pumpName}
              </option>
            ))}
          </Select>
        )}
      </Flex>
      <Flex justifyContent="space-between" mt={4} > 
        <Card boxShadow="2xl" w="33%">
          <CardHeader>
            <Heading backgroundColor={'teal.500'} p={2} w={'fit-content'} color={'white'} size="md" borderRadius={'10%'}>
              Complaints
            </Heading>
          </CardHeader>
          <Doughnut data={dataSurveys} />
        </Card>
        <Card boxShadow="2xl" w="33%">
          <CardHeader>
            <Heading backgroundColor={'teal.500'} p={2} w={'fit-content'} color={'white'} size="md" borderRadius={'10%'}>
              Surveys
            </Heading>
          </CardHeader>
          <Doughnut data={dataQuestionnaire} />
        </Card>
        <Card boxShadow="2xl" w="33%">
          <CardHeader>
            <Heading backgroundColor={'teal.500'} p={2} w={'fit-content'} color={'white'} size="md" borderRadius={'10%'}>
              ONM
            </Heading>
          </CardHeader>
          <Doughnut data={dataQuestionnaire} />
        </Card>
      </Flex>
    </Box>
  );
};

export default Scheduler;
