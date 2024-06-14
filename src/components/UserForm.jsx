import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "react-toastify/dist/ReactToastify.css";
import { handleError } from "../utils/errorHandler";

const UserForm = ({ onUserCreated }) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("avatar", avatar);

    try {
      await axios.post("https://cgp-server.onrender.com/api/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("User created successfully");
      onUserCreated();
      setName("");
      setCity("");
      setAvatar(null);
      setPreview(null);
      setOpen(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setAvatar(null);
    setPreview(null);
  };

  return (
    <>
      <Accordion expanded={open} onChange={() => setOpen(!open)}>
        <AccordionSummary expandIcon={open ? <RemoveIcon /> : <AddIcon />}>
          <Typography>Add New User</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <Button variant="contained" component="label">
              Upload Avatar
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </Button>
            {preview && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={preview}
                  alt="Preview"
                  style={{ width: "100px", margin: "10px 0" }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </Button>
              </Box>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button type="submit" variant="contained" color="primary">
                Create User
              </Button>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default UserForm;
