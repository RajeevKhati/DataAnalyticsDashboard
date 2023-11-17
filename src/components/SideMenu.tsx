import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { theme } from "../utils/theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import ContactsIcon from "@mui/icons-material/Contacts";

const drawerWidth = 220;

interface ListItem {
  label: string;
  isSelected: boolean;
  icon: React.ReactNode;
}

const listItems: ListItem[] = [
  { label: "Dashboard", isSelected: false, icon: <DashboardIcon /> },
  { label: "Accounts", isSelected: false, icon: <AccountBalanceWalletIcon /> },
  { label: "Payroll", isSelected: false, icon: <AttachMoneyIcon /> },
  { label: "Reports", isSelected: false, icon: <DescriptionIcon /> },
  { label: "Advisor", isSelected: false, icon: <PersonIcon /> },
  { label: "Contacts", isSelected: false, icon: <ContactsIcon /> },
];

export default function SideMenu() {
  const [list, setList] = useState<ListItem[]>(listItems);

  const handleItemClick = ({ label }: ListItem) => {
    const updatedList = listItems.map((currentItem) => {
      if (currentItem.label === label) {
        return { ...currentItem, isSelected: true };
      }
      return currentItem;
    });
    setList(updatedList);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {list.map((item) => (
            <ListItem
              key={item.label}
              disablePadding
              sx={{
                backgroundColor: item.isSelected
                  ? theme.palette.primary.main
                  : theme.palette.background.default,
              }}
            >
              <ListItemButton onClick={() => handleItemClick(item)}>
                <ListItemIcon
                  sx={{
                    color: item.isSelected
                      ? theme.palette.common.white
                      : theme.palette.common.black,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    color: item.isSelected
                      ? theme.palette.common.white
                      : theme.palette.common.black,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
