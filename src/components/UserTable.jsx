import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "react-toastify/dist/ReactToastify.css";
import { handleError } from "../utils/errorHandler";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page, limit]);

  const fetchUsers = async (page, limit) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://cgp-server.onrender.com/api/users?page=${page}&limit=${limit}`
      );
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Total Users: {total}</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Limit</InputLabel>
          <Select value={limit} onChange={handleLimitChange}>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
          <Typography sx={{ marginLeft: 2 }}>
            The server is waking up. This may take a few minutes. Please wait...
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Images Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{user.name}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>City: {user.city}</Typography>
                        <Typography>
                          Images Count: {user.images_count}
                        </Typography>
                        <div>
                          {user.images.map((image) => {
                            const imageUrl = image.startsWith("http")
                              ? image
                              : `https://anomi.fra1.digitaloceanspaces.com/vr/${image}`;
                            return (
                              <img
                                key={image}
                                src={imageUrl}
                                alt="user"
                                style={{ width: "100px", marginRight: "10px" }}
                              />
                            );
                          })}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.images_count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default UserTable;
