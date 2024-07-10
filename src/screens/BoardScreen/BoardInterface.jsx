import { useCallback, useState } from "react";
import { Grid } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

import AddTaskModal from "./AddTaskModal";
import BoardTab from "./BoardTab";
import useApp from "../../hooks/UseApp";
import useStore from "../../store";
import AppLoader from "../../components/layout/AppLoader";

const statusMap = {
  todos: "To do",
  inProgress: "In Progress",
  completed: "Completed",
};

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  //states
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const [loading, setLoading] = useState(false);

  const { updateBoardData } = useApp();
  const { setToastr } = useStore();

  //add task
  const handleAddTask = async (text) => {
    // fix case of empty task being added
    if (!text.trim()) {
      return setToastr("Task cannot be empty!");
    }

    const deepClonedTabs = structuredClone(tabs); //deep clone

    if (deepClonedTabs[addTaskTo]) {
      deepClonedTabs[addTaskTo].push({ text, id: crypto.randomUUID() });
    }
    try {
      await handleUpdateBoardData(deepClonedTabs);
      setAddTaskTo("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handle open task modal
  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(status),
    []
  );

  //remove task - memoized ver.
  const handleRemoveTask = useCallback(
    async (tab, taskId) => {
      const deepClone = structuredClone(tabs);
      const taskIdx = deepClone[tab].findIndex((t) => t.id === taskId);
      deepClone[tab].splice(taskIdx, 1);

      try {
        await handleUpdateBoardData(deepClone);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [tabs]
  );

  const handleDND = async ({ destination, source }) => {
    if (destination === null) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const deepClone = structuredClone(tabs);
    // remove task from source tab
    const [draggedTask] = deepClone[source.droppableId].splice(source.index, 1);

    // place task into destination tab
    deepClone[destination.droppableId].splice(destination.index, 0, draggedTask);

    try {
      await handleUpdateBoardData(deepClone);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBoardData = async (deepClone) => {
    setLoading(true);
    await updateBoardData(boardId, deepClone);
    setTabs(deepClone);
    updateLastUpdated();
    setToastr("Board Updated !");
  };


  
  if (loading) return <AppLoader />;

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          statusName={statusMap[addTaskTo]}
          onCLose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          loading={loading}
        />
      )}
      <DragDropContext onDragEnd={handleDND}>
        <Grid container px={2} mt={4} spacing={{ xs: 2, sm: 4 }}>
          {Object.keys(statusMap).map((status) => (
            <BoardTab
              key={status}
              tasks={tabs[status]}
              name={statusMap[status]}
              status={status}
              openAddTaskModal={handleOpenAddTaskModal}
              removeTask={handleRemoveTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;
