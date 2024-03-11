// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// export default function DataTable() {
//   const navigate = useNavigate();

//   const columns = [
//     { field: "id", headerName: "ID", width: 20 },
//     { field: "firstName", headerName: "First name", width: 130 },
//     { field: "lastName", headerName: "Last name", width: 130 },
//     { field: "email", headerName: "Email", width: 200 },
//     {
//       field: "more",
//       headerName: "More",
//       width: 300,

//       renderCell: (params) => (
//         <div>
//           <Button
//             variant="outlined"
//             color="success"
//             onClick={() => deleteUser(params.row.id)}
//           >
//             Delete
//           </Button>

//           <Button
//             variant="outlined"
//             color="error"
//             onClick={() => updateUser(params.row.id)}
//           >
//             Update
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);

//   useEffect(() => {
//     loadUsers();
//   }, []); // Empty dependency array to run the effect only once on component mount

//   const loadUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/student/getAll");
//       setUsers(response.data); // Assuming the response contains the user data in an array format
//       setFilteredUsers(response.data); // Initialize filteredUsers with all users initially
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/student/deleteStudent/${id}`);
//       // Update the users state to remove the deleted user
//       setUsers(users.filter((user) => user.id !== id));
//       loadUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const updateUser = (id) => {
//     // Navigate to the EditStudent component with the id as URL parameter
//     navigate(`/updateStudent/${id}`);
//   };

//   const handleSearch = (e) => {
//     const searchTerm = e.target.value.toLowerCase();
//     // Filter the users based on the search term
//     const filtered = users.filter(
//       (user) =>
//         user.firstName.toLowerCase().includes(searchTerm) ||
//         user.lastName.toLowerCase().includes(searchTerm) ||
//         user.email.toLowerCase().includes(searchTerm)
//     );
//     setFilteredUsers(filtered);
//   };

//   return (
//     <div style={{ height: 500, width: "53%", margin: "0 auto", marginTop: '15px', textAlign: 'right' }}>
//       <TextField variant="outlined" placeholder="Filter..." size="small" onChange={handleSearch} style={{ marginBottom: "4px" }} />
//       <DataGrid rows={filteredUsers} columns={columns} pageSize={5} />
//     </div>
//   );
// }
