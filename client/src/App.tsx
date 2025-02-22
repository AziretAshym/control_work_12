import AppToolbar from "./components/Toolbar/Toolbar.tsx";
import { Container, CssBaseline, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import RegisterPage from './features/users/containers/RegisterPage.tsx';
import LoginPage from './features/users/containers/LoginPage.tsx';
import Images from './features/images/containers/Images.tsx';

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
        <AppToolbar />
      </header>
      <main>
        <Container>
          <Routes>
            <Route path="/" element={<Images />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<Typography variant={"h3"} textAlign="center">Not Found</Typography>} />
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App;
