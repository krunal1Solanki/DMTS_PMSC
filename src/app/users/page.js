"use client"
import { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue, Image } from '@chakra-ui/react'
const { Header, Content, Footer, Sider } = Layout;
import Questionnaire from '../../Components/Questionnaire'
import ActiveSite from '../../Components/ActiveSite';
import SetRates from '../../Components/SetRates';
import CreateGroups from '../../Components/CreateGroups';
import AssignGroups from '../../Components/AssignGroups';
import UserHistoryAndReports from '../../Components/UserHistoryAndReports';

const Settings = () => {
  const router = useRouter();
  const [tab, setTab] = useState(1)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const colors = useColorModeValue(
    ['red.50', 'teal.50', 'blue.50'],
    ['red.900', 'teal.900', 'blue.900'],
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]
  return (
    <Layout style={{ minHeight: '100vh', width : '100%', marginTop: '20px'}}>
    <Layout>
      <Content>
        <Tabs isManual  mt={2} ml={0.5} variant='enclosed'>
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(1)}>Create Groups</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(2)}>Assign Groups</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(3)}>User History And Reports</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                {tab == 1 && <CreateGroups/>}
            </TabPanel>
            <TabPanel>
              {tab == 2 && <AssignGroups/>}
            </TabPanel>
            <TabPanel>
              {tab == 3 && <UserHistoryAndReports/>}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Content>
    </Layout>
  </Layout>
  )
}

export default Settings 