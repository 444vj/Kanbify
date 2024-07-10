import { Toolbar, Stack, AppBar, Typography, IconButton } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";
import { memo } from "react";

const BoardTopBar = ({ name, color, lastUpdated, deleteBoard }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: "5px solid",
        borderColor: colors[color],
        mb: "2rem"
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1} alignItems="center" direction="row">
          <IconButton onClick={() => navigate("/boards")}>
            <BackIcon />
          </IconButton>
          <Typography variant="h6" mb={2}>{name}</Typography>
        </Stack>
        <Stack spacing={2} alignItems="center" direction="row">
          <Typography display={{ xs: "none", sm: "block" }} variant="body2">
            Last updated : {lastUpdated}
          </Typography>
          <IconButton onClick={deleteBoard}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(BoardTopBar);
