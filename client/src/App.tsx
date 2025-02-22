import AppToolbar from './components/Toolbar/Toolbar.tsx';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/containers/RegisterPage.tsx';
import LoginPage from './features/users/containers/LoginPage.tsx';
import Images from './features/images/containers/Images.tsx';
import ImageForm from './features/images/components/ImageForm.tsx';
import ImagesByUser from './features/images/containers/ImagesByUser.tsx';
import { useAppSelector } from './app/hooks.ts';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';

const App = () => {

  const user = useAppSelector((state) => state.users.user);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#2e2e2e",
          color: "#E0E0E0",
        }}
      >
        <header>
          <AppToolbar />
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/" element={<Images />} />

              <Route path="/add-new-image" element={
                <ProtectedRoute isAllowed={user && (user.role === "admin" || user.role === "user")}>
                  <ImageForm/>
                </ProtectedRoute>
              }/>
              <Route path="/images-by-author/:userId" element={<ImagesByUser />}/>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <Typography variant={"h3"} textAlign="center">
                    Not Found
                  </Typography>
                }
              />
            </Routes>
          </Container>
        </main>
      </Box>
    </>
  );
};

export default App;
