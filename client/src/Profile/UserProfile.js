import { useState } from "react";
import WishList from "../pages/WishList/WishList";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";
import Box from "@mui/material/Box";
import ShowOrders from "../components/Orders/ShowOrders";

import "./userProfile.css";

const UserProfile = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="flex flex-col flex-wrap content-center justify-center">
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            borderBottom: 1,
            borderColor: "divider",
            justifyContent: "center",
          }}
        >
          <Tabs
            className="justify-center"
            textColor="info"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab color="#000000" label="Wish List" />
            <Tab label="Orders" />
            <Tab label="Edit Information" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <WishList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ShowOrders />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Edit user details component here.
        </TabPanel>
      </Box>
    </div>
  );
};

export default UserProfile;
