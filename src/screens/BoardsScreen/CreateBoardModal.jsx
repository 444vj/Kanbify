import {
  Dialog,
  Stack,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import ModalHeader from "../../components/layout/ModalHeader";
import { colors } from "../../theme";
import useApp from "../../hooks/UseApp";
import useStore from "../../store";

const CreateBoardModal = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);
  const [loading, setLoading] = useState(false);

  const { createBoard } = useApp();
  const {setToastr} =  useStore()

  const handleCreate = async () => {
    const trimmedName = name.trim()
    if(!trimmedName) return setToastr('Board name cannot be empty!')
    if(name.length > 20) return setToastr('Board name cannot be more than 20 characters!')
    try {
      setLoading(true);
      await createBoard({ name: trimmedName, color });
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog
      open
      onClose={closeModal}
      fullWidth
      maxWidth="xs"
    >
      <Stack p={2}>
        <ModalHeader onClose={closeModal} title="Create Board" />
        <Stack my={5} spacing={3}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Board Name"
          />
          <Stack spacing={1.5} direction="row">
            <Typography>Color :</Typography>
            {colors.map((clr, index) => (
              <Box
                onClick={() => setColor(index)}
                key={clr}
                height={25}
                width={25}
                backgroundColor={clr}
                borderRadius="50%"
                sx={{
                  cursor: "pointer",
                  border: color === index ? "3px solid #383838" : "none",
                  outline: `2px solid ${clr}`,
                }}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          disabled={loading}
          onClick={handleCreate}
          size="large"
          variant="contained"
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;
