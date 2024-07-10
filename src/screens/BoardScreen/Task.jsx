import { Stack, Typography, IconButton } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

import DeleteIcon from "@mui/icons-material/Delete";

const Task = ({ id, text, index, removeTask }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Stack
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Typography
            width="100%"
            p={1}
            border="1px solid"
            borderColor="#777980"
            bgcolor="#45474E"
            borderRadius="10px"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            {text}
          </Typography>
          <IconButton onClick={removeTask}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      )}
    </Draggable>
  );
};

export default Task;
