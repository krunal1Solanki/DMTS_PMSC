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
import Office from '../../Components/Office';
import QueryDisplay from '../../Components/QueryDisplay';
import ImeiApproval from '../../Components/ImeiApproval'


const Settings = () => {
  const router = useRouter();
  const [tab, setTab] = useState(1)
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
  return (
    <Layout style={{ minHeight: '100vh', width : '100%', marginTop : '20px' }}>
    <Layout>
      <Content>
        <Tabs isManual mt={2} ml={0.5} variant='enclosed'>
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(1)}>Questionaire</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(2)}>Rates</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(3)}>Active Site</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(4)}>Query</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(5)}>Office</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }} onClick={()=> setTab(6)}>IMEI Approval</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                {tab == 1 && <Questionnaire/>}
            </TabPanel>
            <TabPanel>
                {tab == 2 && <SetRates/>}
            </TabPanel>
            <TabPanel>
                {tab == 3 && <ActiveSite/>}
            </TabPanel>
            <TabPanel>
                {tab == 4 && <QueryDisplay/>}
            </TabPanel>
            <TabPanel>
                {tab == 5 && <Office/>}
            </TabPanel>
            <TabPanel>
                {tab == 6 && <ImeiApproval/>}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Content>
    </Layout>
  </Layout>
  )
}

export default Settings 