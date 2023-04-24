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
    Button
} from "@mui/material";

import { useEffect, useState } from "react";
import { Coach } from "../../models/Coach";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Paginator } from "../pagination/Pagination";


export const CoachShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [coaches, setCoaches] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const current = (page - 1) * pageSize + 1;
    const [isLastPage, setIsLastPage] = useState(false);
    const [totalRows, setTotalRows] = useState(0);

    const setCurrentPage = (newPage: number) => {
        setPage(newPage);
    }

    const goToNextPage = () => {
        if (isLastPage) {
            return;
        }

        setPage(page + 1);
    }

    const goToPrevPage = () => {
        if (page === 1) {
            return;
        }

        setPage(page - 1);
    }

    const fetchCoaches = async() => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/coach?page=${page}&page_size=${pageSize}`
        );
        const {count, next, previous, results} = await response.json();
        setCoaches(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoaches();
    }, [page]);

    const sortCoaches = () => {
        const sortedCoaches = [...coaches].sort((a: Coach, b:Coach) => {
            if (a.c_years_of_experience < b.c_years_of_experience) {
                return -1;
            }
            if (a.c_years_of_experience > b.c_years_of_experience) {
                return 1;
            }
            return 0;

        })
        console.log(sortedCoaches);
        setCoaches(sortedCoaches);
    }

  
    return (
        <Container>
        <h1 style={{marginTop:"65px"}}>All Coaches</h1>
        {loading && <CircularProgress />}

        {!loading && coaches.length == 0 && <div>No coaches found!</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/add`}>
                        <Tooltip title="Add a new coach" arrow>
                            <AddCircleIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        )}

        {!loading && (
            <Button sx={{color:"red"}} onClick={sortCoaches}>
                Sort coaches
            </Button>
        )}

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
                            <TableCell align="center">Operations</TableCell>
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
                                <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/coaches/${coach.id}`}>
											<Tooltip title="View coach details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coach.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coach.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Paginator
                        rowsPerPage={pageSize}
                        totalRows={totalRows}
                        currentPage={page}
                        isFirstPage={page === 1}
                        isLastPage={isLastPage}
                        setPage={setCurrentPage}
                        goToNextPage={goToNextPage}
                        goToPrevPage={goToPrevPage}
                    />
            </>
        )}
    </Container>
    );
  };