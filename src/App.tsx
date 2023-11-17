import "./App.css";
import MainLayout from "./components/MainLayout";
import NavBar from "./components/NavBar";
import SideMenu from "./components/SideMenu";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function App() {
  return (
    <Box sx={{ backgroundColor: "background.paper" }}>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <MainLayout />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
