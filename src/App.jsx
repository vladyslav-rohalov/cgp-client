import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserCreated = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <UserForm onUserCreated={handleUserCreated} />
      <Box sx={{ marginBottom: 4 }} />
      <UserTable key={refreshKey} />
    </Container>
  );
};

export default App;
