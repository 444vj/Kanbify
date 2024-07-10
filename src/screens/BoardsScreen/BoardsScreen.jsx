import React, { useState, useEffect } from "react";
import TopBar from "./TopBar";
import CreateBoardModal from "./CreateBoardModal";
import NoBoards from "./NoBoards";
import BoardCard from "./BoardCard";
import useApp from "../../hooks/UseApp";
import AppLoader from "../../components/layout/AppLoader";
import useStore from "../../store";
import { Stack, Grid } from "@mui/material";

const BoardsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { fetchBoards } = useApp();
  const { boards, areBoardsFetched } = useStore();

  useEffect(() => {
    if (areBoardsFetched === false) fetchBoards(setLoading);
    else setLoading(false);
  }, []);

  if (loading) return <AppLoader />;

  return (
    <>
      <TopBar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}

      {!boards.length ? (
        <NoBoards />
      ) : (
        <Stack px={3} mt={5}>
          <Grid container spacing={{xs:2,  sm:4}}>
            {boards.map((board) => (
              <BoardCard key={board.id} {...board} />
            ))}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default BoardsScreen;
