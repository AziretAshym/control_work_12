import { AppBar, Box, Toolbar } from "@mui/material";
import { useAppSelector } from "../../app/hooks.ts";
import { selectUser } from "../../features/users/usersSlice.ts";
import AnonymousMenu from "./AnonymousMenu.tsx";
import UserMenu from "./UserMenu.tsx";

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginBottom: "15px",
        backgroundColor: "rgba(16, 20, 24, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#E0E0E0",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {user ? (
            <>
              <UserMenu user={user} />
            </>
          ) : (
            <AnonymousMenu />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;
