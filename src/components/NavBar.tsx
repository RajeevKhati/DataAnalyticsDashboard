import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Button, ButtonProps, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRandomizeDataContext } from "../contexts/randomize-data-context/useRandomizeDataContext";
import MenuIcon from "@mui/icons-material/Menu";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "20ch",
  },
}));

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.background.default,
  backgroundColor: theme.palette.primary.main,
  fontWeight: 700,
  boxShadow: "none",
  letterSpacing: 0.1,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
  },
}));

interface NavBarProps {
  handleToggle: () => void;
}

export default function NavBar({ handleToggle }: NavBarProps) {
  const { randomizeAllData } = useRandomizeDataContext();
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "background.default",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                flexGrow: 1,
              }}
            >
              ASSIDUUS
            </Typography>

            <StyledButton onClick={randomizeAllData}>
              Randomize Data
            </StyledButton>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Box>
              <IconButton
                size="large"
                aria-label="show new notifications"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                sx={{ padding: "5px" }}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt="Travis Howard"
                  src="https://mui.com/static/images/avatar/2.jpg"
                />
              </IconButton>
              <IconButton size="small" aria-label="drop down" color="inherit">
                <ArrowDropDownIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
