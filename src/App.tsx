import "./App.css";
import MainLayout from "./components/MainLayout";
import NavBar from "./components/NavBar";
import SideMenu from "./components/SideMenu";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

function App() {
  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            // bgcolor: "background.paper",
            // bgcolor: "red",
            height: "50vh",
          }}
          className="hello"
        >
          <Toolbar />
          <MainLayout />
        </Box>
      </Box>
    </>
  );
}

export default App;
