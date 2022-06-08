import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DairyComponent from './Dairy';
import UserCredentialsComponent from './UserCredentials';

const TabComponent = () => {
  const location = useLocation();
  const userid = location.state.userid
  const navigate = useNavigate();
  return (
    <div >
      <Tabs className="Tabs">
        <TabList>
          <Tab>Dairy</Tab>
          <Tab>My Credentials</Tab>
        </TabList>
        <TabPanel>
          <DairyComponent />
        </TabPanel>
        <TabPanel>
          <UserCredentialsComponent />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default TabComponent;
