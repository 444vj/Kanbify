import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import React from "react";
import ImageEl from "../../components/utils/ImageEl";
import logo from "../../assets/boardsScreenLogo.svg";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import CreateBoardIcon from "@mui/icons-material/AddCircle";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const TopBar = ({ openModal }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <ImageEl
          sx={{
            height: "35px",
            ml: 0

          }}
    
          src={logo}
          alt="FlowBoard"
        />
        <Stack direction="row" spacing={4}>
          {isXs ? (
            <>
              <IconButton onClick={openModal} color="primary">
                <CreateBoardIcon />
              </IconButton>
              <IconButton onClick={() => signOut(auth)}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              {" "}
              <Button
                onClick={openModal}
                variant="contained"
                sx={{ borderRadius: ".5rem" }}
              >
                Create Board
              </Button>
              <Button
                onClick={() => signOut(auth)}
                startIcon={<LogoutIcon />}
                color="inherit"
              >
                Logout
              </Button>{" "}
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
