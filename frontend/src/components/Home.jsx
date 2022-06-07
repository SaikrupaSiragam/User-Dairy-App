import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../assets/css/home.css"
import LoginComponent from './Login';
import SingUpComponent from './SingUp';

const Home = () => {
  
  return (
    <div className="home-container">
        <Tabs >
       <TabList >
         <Tab>Login</Tab>
         <Tab>Signup</Tab>
       </TabList>
<TabPanel>
         <LoginComponent/>
       </TabPanel>
       <TabPanel>
         <SingUpComponent/>
       </TabPanel>
     </Tabs>
    </div>
  );
}

export default Home;