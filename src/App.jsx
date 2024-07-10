import { auth } from "./firebase";
import { useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import theme from "./theme";
import useStore from "./store";
import AppLoader from "./components/layout/AppLoader";

//screens
import AuthScreen from "./screens/AuthScreen/AuthScreen";
import BoardsScreen from "./screens/BoardsScreen/BoardsScreen"
import BoardScreen from "./screens/BoardScreen/BoardScreen";

// utils
import PublicOnlyRoute from "./components/utils/PublicOnlyRoute";
import PrivateRoute from './components/utils/PrivateRoute'
import SnackbarManager from "./components/layout/SnackbarManager";



const App = () => {
  const { loader, setLoginStatus } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoginStatus(!!user);
    });
    return unsubscribe;
  }, []);

  if (loader) return <AppLoader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarManager />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PublicOnlyRoute Component={AuthScreen} />}
          />
          <Route
            path="/boards"
            element={<PrivateRoute Component={BoardsScreen} />}
          />
          <Route
            path="/boards/:boardId"
            element={<PrivateRoute Component={BoardScreen} />}
          />
          {/* redirecting the user to AuthScreen if they try to access a random path */}
          <Route 
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
