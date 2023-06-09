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
import { TournamentRegistration } from "../../models/TournamentRegistration";
import { Tournament } from "../../models/Tournament";
import { TennisPlayer } from "../../models/TennisPlayer";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Paginator } from "../pagination/Pagination";



export const TournamentRegistrationShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [tournamentRegs, setTournamentRegs] = useState([]);
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


    const fetchTournamentRegs = async() => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/tournamentreg?page=${page}&page_size=${pageSize}`
        );
        const {count, next, previous, results} = await response.json();
        setTournamentRegs(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
    };

    useEffect(() => {
        fetchTournamentRegs();
    }, [page]);
  
    return (
        <Container>
        <h1 style={{marginTop:"65px"}}>All Registrations</h1>
        {loading && <CircularProgress />}

        {!loading && tournamentRegs.length == 0 && <div>No tournament registrations found!</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/tournamentregs/add`}>
                        <Tooltip title="Add a new registration" arrow>
                            <AddCircleIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        )}

        {!loading && tournamentRegs.length > 0 && (
            <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Registration Date</TableCell>
                            <TableCell align="center">Last Year Performance</TableCell>
                            {/* <TableCell align="center">Player</TableCell>
                            <TableCell align="center">Tournament</TableCell> */}
                            <TableCell align="center">Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tournamentRegs.map((tournamentReg:TournamentRegistration, index) => (
                            <TableRow key={tournamentReg.id}>
                                <TableCell component="th" scope="row">
                                    {index + current}
                                </TableCell>
                                <TableCell align="center">{tournamentReg.tr_registration_date}</TableCell>
                                <TableCell align="center">{tournamentReg.tr_last_year_performance}</TableCell>
                                {/* <TableCell align="center">{tournamentReg?.tr_player?.id}</TableCell>
                                <TableCell align="center">{tournamentReg?.tr_tournament?.id}</TableCell> */}
                                <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/tournamentregs/${tournamentReg.id}`}>
											<Tooltip title="View registration details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/tournamentregs/${tournamentReg.id}/delete`}>
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