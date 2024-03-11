import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, TextField, Container, Paper, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Search() {
  const navigate = useNavigate();
  const paperStyle = {
    padding: "2px 20px",
    width: 600,
    height: 70,
    margin: "6px auto",
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "more",
      headerName: "Action",
      width: 300,

      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            color="success"
            onClick={() => updateUser(params.row.id)}
          >
            update
          </Button>
          &nbsp; &nbsp;
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteUser(params.row.id)}
          >
            delete
          </Button>
        </div>
      ),
    },
  ];

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the selected search field
  const [searchValue, setSearchValue] = useState(""); // State to store the entered search value
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []); // Empty dependency array to run the effect only once on component mount

  const loadUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/student/getAll");
      setUsers(response.data);
      setFilteredUsers(response.data); // Initialize filteredUsers with all users initially
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/student/deleteStudent/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      loadUsers();
      window.alert("Delete successful");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const updateUser = (id) => {
    navigate(`/updateStudent/${id}`);
  };

  const handleSearch = () => {
    // Filter the users based on the search term
    const filtered = users.filter((user) =>
      user[searchTerm].toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const queryParams = {};

      if (searchTerm === "firstName") {
        queryParams.firstName = searchValue;
      } else if (searchTerm === "lastName") {
        queryParams.lastName = searchValue;
      } else if (searchTerm === "email") {
        queryParams.email = searchValue;
      }

      const response = await axios.get("http://localhost:8080/student/search", {
        params: queryParams,
      });

      if (response.data.length === 0) {
        setError("No data found.");
        setSearchTerm("");
        window.alert("no data");
      } else {
        console.log(response.data);
        setError("Successfully fetched.");
        setTimeout(() => {
          setError("");
        }, 3000);
        setSearchTerm("");
        setFilteredUsers(response.data); // Update filteredUsers with search results
      }

      // clear the form fields after successful submission
      setSearchValue("");
    } catch (error) {
      console.error("Error fetching student data:", error);
      setError("Failed to fetch. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <div>
      <Container>
        <Paper elevation={3} style={paperStyle}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="search-term-label">Search Term</InputLabel>
                  <Select
                    labelId="search-term-label"
                    id="search-term"
                    value={searchTerm}
                    label="searchTerm"
                    onChange={handleSearchTermChange}
                  >
                    <MenuItem value="firstName">First Name</MenuItem>
                    <MenuItem value="lastName">Last Name</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={8}>
                <TextField
                  id="search-value"
                  label="Search Value"
                  variant="standard"
                  value={searchValue}
                  onChange={handleSearchValueChange}
                />

&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginRight: "10px" }}
                >
                  <SearchIcon />
                </Button>
                <Button variant="contained" color="primary" onClick={loadUsers}>
                  Back
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>

      <div
        style={{
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          height: 380,
          width: "60%",
          marginTop: "15px",
          textAlign: "center",
        }}
      >
        {/* <TextField
          variant="outlined"
          placeholder="Filter..."
          size="small"
          onChange={handleSearch}
          style={{ marginBottom: "4px", marginTop: "-1%" }}
        /> */}
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />

        {/* <Box
          component="form"
          onClick={handlePageSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="pageNo"
            placeholder="No of Pages..."
            value={pageNo}
            onChange={(event) => setPageNo(event.target.value)}
          />
          &nbsp; &nbsp;
          <TextField
            id="pageSize"
            placeholder="No of Raws..."
            value={pageSize}
            onChange={(event) => setPageSize(event.target.value)}
          />
          &nbsp; &nbsp;
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ marginTop: "20px" }}
            onClick={handlePageSubmit}
          >
            {" "}
            Sort
          </Button>
        </Box> */}
      </div>
    </div>
  );
}
