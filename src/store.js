import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  loader: true,
  isLoggedIn: false,

  //fetch boards
  boards: [],
  areBoardsFetched: false,
  setBoards: (boards) =>
    set({ boards, areBoardsFetched: true }, false, "setBoards"),

    // once we create a new board, it doesnt immediately show up on the BoardsScreen,
    // only once we refresh the page the changes are reflected. 
    // in order to fix this issue, we implement addBoard
  addBoard: board => set((old) => ({boards: [board, ...old.boards]}), false, "addBoard"),

  // global state
  setLoginStatus: (status) =>
    set(
      {
        isLoggedIn: status,
        loader: false,
        boards: [],
        areBoardsFetched: false
      },
      false,
      "setLoginStatus"
    ),

    //toastr
    toastrMsg: '',
    setToastr: toastrMsg => set({toastrMsg}, false, "setToastr")
});

const useStore = create(devtools(store));

export default useStore;
