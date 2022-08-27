import { Box, Tab, Tabs } from "@mui/material";
import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
import PropTypes from "prop-types";

interface TabPanelProps {
  children: ReactNode;
  value: any;
  index: any;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

interface IPopperTabsProps {
  handleSelectedTabChange?: (event: React.SyntheticEvent<Element, Event>, value: any) => void;
  selectedTab: number;
  handleLogout: React.MouseEventHandler<HTMLButtonElement>;
}

const PopperTabs = ({ handleSelectedTabChange, selectedTab, handleLogout, ...props }: IPopperTabsProps) => {
  function a11yProps(index: number) {
    return {
      id: `profile-tab-${index}`,
      "aria-controls": `profile-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs variant="fullWidth" value={selectedTab} onChange={handleSelectedTabChange} aria-label="profile tabs">
          <Tab
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "capitalize",
            }}
            icon={<UserOutlined style={{ marginBottom: 0, marginRight: "10px" }} />}
            label="Profile"
            {...a11yProps(0)}
          />
          <Tab
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "capitalize",
            }}
            icon={<SettingOutlined style={{ marginBottom: 0, marginRight: "10px" }} />}
            label="Setting"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <ProfileTab handleLogout={handleLogout} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <SettingTab />
      </TabPanel>
    </>
  );
};

export default PopperTabs;
