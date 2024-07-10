import {
  Dialog,
  Typography,
  Stack,
  IconButton,
  Chip,
  OutlinedInput,
  Button,
} from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader";
import { useState } from "react";

const AddTaskModal = ({ statusName, onClose, addTask, loading }) => {
  // creating states in order to update / add task text
  const [text, setText] = useState("");

  return (
    <Dialog open fullWidth maxWidth="xs" onClose={onClose}>
      <Stack mb={1} p={2}>

        <ModalHeader title="Add Task" onClose={onClose} />
        <Stack mt={3} spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>Status : </Typography>
            <Chip size="small" label={statusName} />
          </Stack>
          <OutlinedInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="task"
          />
          <Button
            disabled={loading}
            variant="contained"
            onClick={() => addTask(text)}
          >
            Add Task
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;
