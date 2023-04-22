import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    Button,
    TextField
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Coach } from "../../models/Coach";
import { BACKEND_API_URL } from "../../constants";


export const CoachYoeFilter = () => {
    const [loading, setLoading] = useState(true);
    const [coaches, setCoaches] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const current = (page - 1) * pageSize + 1;
    const [yoeFilter, setYoeFilter] = useState("");

    const fetchCoaches = async() => {
        setLoading(true);
        let url = `${BACKEND_API_URL}/yearsofexp/${yoeFilter}/?page=${page}&page_size=${pageSize}`;
        const response = await fetch(url);
        const {count, next, previous, results} = await response.json();
        setCoaches(results);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoaches();
    }, [page]);

    return (
        <Container>
        <h1>All Coaches Filtered By YOE</h1>

        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
        <TextField 
          label="Years of Experience"
          value={yoeFilter}
          onChange={(e) => setYoeFilter(e.target.value)}
          InputProps={{ style: { color: "whitesmoke" } }}
          InputLabelProps={{style: {color: 'whitesmoke'}}}
          style={{ marginRight: "16px", color:'whitesmoke' }}
        />
        <Button variant="contained" style={{color:"whitesmoke"}} onClick={() => fetchCoaches()}>
          Filter
        </Button>
        </div>

        {loading && <CircularProgress />}

        {!loading && coaches.length == 0 && <div>No coaches found!</div>}

        {!loading && coaches.length > 0 && (
            <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Date Of Birth</TableCell>
                            <TableCell align="center">Years of experience</TableCell>
                            <TableCell align="center">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coaches.map((coach:Coach, index) => (
                            <TableRow key={coach.id}>
                                <TableCell component="th" scope="row">
                                    {index + current}
                                </TableCell>
                                <TableCell align="center">{coach.c_first_name}</TableCell>
                                <TableCell align="center">{coach.c_last_name}</TableCell>
                                <TableCell align="center">{coach.c_date_of_birth}</TableCell>
                                <TableCell align="center">{coach.c_years_of_experience}</TableCell>
                                <TableCell align="center">{coach.c_email}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button disabled={page === 1} onClick={() => setPage(page-1)}>Previous</Button>
            <Button disabled={coaches.length < pageSize} onClick={() => setPage(page + 1)}>Next</Button>
            </>
        )}
    </Container>
    )
}