import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const useApp = () => {
  const {
    currentUser: { uid },
  } = getAuth();

  const boardsCollectionRef = collection(db, `users/${uid}/boards`); // for fetchBoards
  const { boards, addBoard, setBoards, setToastr } = useStore();
  const navigate = useNavigate()

  const createBoard = async ({ name, color }) => {
    const collectionRef = collection(db, `users/${uid}/boards`);
    try {
      const doc = await addDoc(collectionRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      //addBoard to fix the refresh issue
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleString("en-US"),
        id: doc.id,
      });
    } catch (error) {
      setToastr('Error creating board !');
      throw error;
    }
  };

  //fetching the boards
  const fetchBoards = async (setLoading) => {
    try {
      // sort the boards by createdAt
      const q = query(boardsCollectionRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-US"),
      }));
      setBoards(boards);
    } catch (error) {
      setToastr('Error fetching boards !');
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  //fetch single board
  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      } else {
        return null;
      }
    } catch (error) {
      setToastr('Error fetching board !');
    }
  };

  // update the task data / mutate the tabs
  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (error) {
      setToastr('Error updating board !');
    }
  };

  //delete Board
  const deleteBoard = async (boardId) =>{
    
    try {
      //creating a document reference, since we do not want the user to directly delete the boards

      //delete the doc from database
      const docRef = doc(db, `users/${uid}/boards/${boardId}`)
      await deleteDoc(docRef)

      //delete the doc from database
      const tempBoards = boards.filter(board => board.id !== boardId )
      setBoards(tempBoards)

      //navigate back to the boards screen
      navigate("/boards")

    } catch (error) {
      setToastr("Error deleting the board!")
      throw error
    }

  }

  return { createBoard, fetchBoards, fetchBoard, updateBoardData, deleteBoard };
};

export default useApp;
