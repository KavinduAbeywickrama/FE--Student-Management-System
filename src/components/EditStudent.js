import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function EditStudent() {
  const { id } = useParams();
  let navigate = useNavigate();

  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {

    // Fetch the student data using the id parameter from the URL
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/student/getStudent/${id}`
        );
        const { firstName, lastName, email } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    fetchStudent();
  }, [id]);

  const updateStudent = async (e) => {
    e.preventDefault();
    const data = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    try {
      // Send the updated data to the backend
      const response = await axios.put(`http://localhost:8080/student/updateStudent`,
        data
      );

      navigate("/")

      window.alert("Update successfull")

      // Clear the form fields after submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setError("Successfully updated, Check Detail Section");

      setTimeout(() => {
        setError("");
      }, 4000); 

      // error handling
    } catch (error) {
      console.error("Error updating student:", error);
      // Set the error message 
      setError("Failed to update student. Please try again later.");
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Update Student Details</u>{" "}
        </h1>
        <Box
          component="form"
          onSubmit={updateStudent}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="first-name"
            label="First Name"
            variant="standard"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ marginTop: "20px" }}
          />
          <TextField
            id="last-name"
            label="Last Name"
            variant="standard"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            sx={{ marginTop: "20px" }}
          />
          <TextField
            type="email"
            id="email"
            label="Email"
            variant="standard"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginTop: "20px" }}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ marginTop: "20px" }}
            onClick={updateStudent}
          >
            {" "}
            Update
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              
              variant="contained"
             
              sx={{ marginTop: "20px", marginLeft: "10px", backgroundColor: "red", '&:hover': { backgroundColor: 'red' } }}

            >
              Cancel
            </Button>
            </Link>
        </Box>
      </Paper>
    </Container>
  );
}
