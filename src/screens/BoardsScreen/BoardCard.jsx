import React from "react";
import { Stack, Grid, Typography, IconButton, Box } from "@mui/material";
import OpenIcon from "@mui/icons-material/Launch";
import { colors } from "../../theme";
import { useNavigate } from "react-router-dom";

const BoardCard = ({ name, color, createdAt, id }) => {

  const navigate = useNavigate()

  return (
    <Grid item sm={3} xs={12}>
      <Stack
        p={2}
        bgcolor="background.paper"
        borderLeft="5px solid"
        borderRadius="10px"
        borderColor={colors[color]} // colors is an array imported from theme.js and color is a number indicating the index of the color in the colors array
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box width="60%">
            <Typography
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              variant="body"
              fontWeight={500}
            >
              {name}
            </Typography>
          </Box>

          <IconButton onClick={() => navigate(`/boards/${id}`)} size="small">
            <OpenIcon />
          </IconButton>
        </Stack>
        <Typography variant="caption">Created At : {createdAt}</Typography>
      </Stack>
    </Grid>
  );
};

export default BoardCard;
