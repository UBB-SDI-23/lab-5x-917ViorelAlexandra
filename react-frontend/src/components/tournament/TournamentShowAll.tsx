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
import { Tournament } from "../../models/Tournament";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";



export const TournamentShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [tournaments, setTournaments] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const current = (page - 1) * pageSize + 1;

    const fetchTournaments = async() => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/tournament?page=${page}&page_size=${pageSize}`
        );
        const {count, next, previous, results} = await response.json();
        setTournaments(results);
        setLoading(false);
        console.log(results);
    };

    useEffect(() => {
        fetchTournaments();
    }, [page]);

    const sortTournaments = () => {
        const sortedTournaments = [...tournaments].sort((a: Tournament, b: Tournament) => {
            if (a.t_name < b.t_name) {
                return -1;
            }
            if (a.t_name > b.t_name) {
                return 1;
            }
            return 0;

        })
        console.log(sortTournaments);
        setTournaments(sortedTournaments);
    }

  
    return (
        <Container>
        <h1 style={{marginTop:"65px"}}>All Tournaments</h1>
        {loading && <CircularProgress />}

        {!loading && tournaments.length == 0 && <div>No tournaments found!</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/tournaments/add`}>
                        <Tooltip title="Add a new tournament" arrow>
                            <AddCircleIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        )}

        {!loading && (
            <Button sx={{color:"red"}} onClick={sortTournaments}>
                Sort tournaments
            </Button>
        )}

        {!loading && tournaments.length > 0 && (
            <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Country</TableCell>
                            <TableCell align="center">Start date</TableCell>
                            <TableCell align="center">End date</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tournaments.map((tournament:Tournament, index) => (
                            <TableRow key={tournament.id}>
                                <TableCell component="th" scope="row">
                                    {index + current}
                                </TableCell>
                                <TableCell align="center">{tournament.t_name}</TableCell>
                                <TableCell align="center">{tournament.t_country}</TableCell>
                                <TableCell align="center">{tournament.t_start_date}</TableCell>
                                <TableCell align="center">{tournament.t_end_date}</TableCell>
                                <TableCell align="center">{tournament.t_type}</TableCell>
                                <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/tournaments/${tournament.id}`}>
											<Tooltip title="View tournament details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/tournaments/${tournament.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/tournaments/${tournament.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
            <Button disabled={page === 1} onClick={() => setPage(page-1)}>Previous</Button>
            <Button disabled={tournaments.length < pageSize} onClick={() => setPage(page + 1)}>Next</Button>
            </>
        )}
    </Container>
    );
  };