import React, { memo } from "react";
import { Grid, Stack, Typography, IconButton } from "@mui/material";
import StrictModeDroppable from "../../components/utils/StrictModeDroppable";

import AddIcon from "@mui/icons-material/AddCircleOutline";
import Task from "./Task";

const BoardTab = ({ name, tasks, status, openAddTaskModal, removeTask }) => {
  return (
    <StrictModeDroppable droppableId={status}>
      {(provided) => (
        <Grid {...provided.droppableProps}  ref={provided.innerRef} item sm={4} xs={12}>
          <Stack p={3} bgcolor="black" borderRadius="15px">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1" fontWeight={200} mb={2}>
                {name}
              </Typography>
              <IconButton onClick={() => openAddTaskModal(status)}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Stack spacing={2} mb={2}>
              {!!tasks &&
                tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    text={task.text}
                    id={task.id}
                    removeTask={() => removeTask(status, task.id)}
                    index = {index}
                  />
                ))}
            </Stack>
            {provided.placeholder}
          </Stack>
        </Grid>
      )}
    </StrictModeDroppable>
  );
};

export default memo(BoardTab);
