import "./App.css";
import MainLayout from "./components/MainLayout";
import NavBar from "./components/NavBar";
import SideMenu from "./components/SideMenu";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { RandomizeDataProvider } from "./contexts/randomize-data-context/RandomizeDataProvider";

function App() {
  return (
    <RandomizeDataProvider>
      <Box sx={{ backgroundColor: "background.paper" }}>
        <NavBar />
        <Box sx={{ display: "flex" }}>
          <SideMenu />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 2,
              overflow: "auto",
              paddingBottom:"40px"
            }}
          >
            <Toolbar />
            <MainLayout />
          </Box>
        </Box>
      </Box>
    </RandomizeDataProvider>
  );
}

export default App;
