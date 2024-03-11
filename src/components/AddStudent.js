import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, Box } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddStudent() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Check if any field is empty
    if (!firstName) {
      setError("Please fill the First Name field.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (!lastName) {
      setError("Please fill the Last Name field.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    if (!email) {
      setError("Please fill the Email field.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

        // Check if any field is empty
        if (!firstName && !lastName && !email) {
          setError("Please fill in all fields.");
          setTimeout(() => {
            setError("");
          }, 3000);
          return;
        }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    //  send data to backend
    try {
      await axios.post("http://localhost:8080/student/addStudent", {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      console.log({ firstName, lastName, email });
      setError("Successfully added");
      setTimeout(() => {
        setError("");
      }, 4000);

      // clear the form fields after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error) {
      console.error("Error adding student:", error);
      setError("Failed to add student. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Add Student</u>{" "}
        </h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Box
          component="form"
          onSubmit={handleSubmit}
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
            onClick={handleSubmit}
          >
            {" "}
            Submit
          </Button>

          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              sx={{
                marginTop: "20px",
                marginLeft: "10px",
                backgroundColor: "red",
                "&:hover": { backgroundColor: "red" },
              }}
            >
              Cancel
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}
