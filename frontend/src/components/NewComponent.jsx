import React from 'react'
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DairyComponent from './Dairy';
import UserCredentialsComponent from './UserCredentials';

 const NewComponent = () => {
  const [selectedIndex, setStateofIndex]=useState(0);
  const   handleSelect = index => {
    setStateofIndex({ selectedIndex: index });
  };
console.log(new Date().toISOString().slice(0, 10));
 const handleButtonClick = () => {
    setStateofIndex({ selectedIndex: 0 });
  };
  return (
    <div>
    
     <Tabs className="Tabs">
       <TabList>
         <Tab>Dairy</Tab>
         <Tab>My Credentials</Tab>
       </TabList>
<TabPanel>
         <DairyComponent/>
       </TabPanel>
       <TabPanel>
         <UserCredentialsComponent/>
       </TabPanel>
     </Tabs>
   </div>
  )
}

export default NewComponent;
