import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BoardTopBar from "./BoardTopBar";
import BoardInterface from "./BoardInterface";
import BoardNotReady from "./BoardNotReady";

import useStore from "../../store";
import useApp from "../../hooks/UseApp";
import AppLoader from "../../components/layout/AppLoader";

const BoardScreen = () => {
  const navigate = useNavigate();

  const { boardId } = useParams();
  const { boards, areBoardsFetched } = useStore();
  const { fetchBoard, deleteBoard } = useApp();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const board = useMemo(() => boards.find((b) => b.id === boardId), []); //memoizing the value in order to make it more performative
  const boardData = useMemo(() => data, [data]); // memoizing the board data

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(boardId);
      if (boardData) {
        const { lastUpdated, tabs } = boardData;
        setData(tabs); // the issue was i put setData(boardData)
        setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //handle last updated
  const handleUpdateLastUpdated = useCallback(() =>
    setLastUpdated(new Date().toLocaleString("en-US"), [])
  );

  //handle delete
  const handleDeleteBoard = useCallback(async () => {
    if (!window.confirm("Do you want to delete this board?")) {
      return 
    }
    try {
      setLoading(true);
      await deleteBoard(boardId);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  }, []);

  // if boards are not fetched, navigating back to the boards screen
  useEffect(() => {
    if (!areBoardsFetched || !board) {
      navigate("/boards");
    } else {
      handleFetchBoard();
    }
  }, []);

  if (!board) return null;
  if (loading) return <AppLoader />;
  if (!data) return <BoardNotReady />;

  return (
    <>
      <BoardTopBar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
        deleteBoard={handleDeleteBoard}
      />
      <BoardInterface
        boardData={boardData}
        boardId={boardId}
        updateLastUpdated={handleUpdateLastUpdated}
      />
    </>
  );
};

export default BoardScreen;
