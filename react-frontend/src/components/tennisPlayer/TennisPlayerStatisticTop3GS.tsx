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

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TennisPlayer } from "../../models/TennisPlayer";
import { TennisPlayerStatistic } from "../../models/TennisPlayerStatistic";
import { BACKEND_API_URL } from "../../constants";
import { Paginator } from "../pagination/Pagination";


export const TennisPlayerShowTop3GrandSlam = () => {
    const [loading, setLoading] = useState(true);
    const [tennisPlayers, setTennisPlayers] = useState([]);
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


    const fetchTennisPlayers = async() => {
        setLoading(true);
        const response = await fetch(
            `${BACKEND_API_URL}/playergs/?page=${page}&page_size=${pageSize}`
        );
        const {count, next, previous, results} = await response.json();
        console.log(results);
        setTennisPlayers(results);
        setTotalRows(count);
        setIsLastPage(!next);
        setLoading(false);
    };

    useEffect(() => {
        fetchTennisPlayers();
    }, [page]);

    return (
        <Container>
        <h1>Tennis Players Registered In Grand Slam Tournament</h1>
        {loading && <CircularProgress />}

        {!loading && tennisPlayers.length == 0 && <div>No tennis players found!</div>}

        {!loading && tennisPlayers.length > 0 && (
            <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">First Name</TableCell>
                            <TableCell align="center">Last Name</TableCell>
                            <TableCell align="center">Rank</TableCell>
                            <TableCell align="center">Date Of Birth</TableCell>
                            <TableCell align="center">Country</TableCell>
                            <TableCell align="center">Gender</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tennisPlayers.map((tennisPlayer:TennisPlayer, index) => (
                            <TableRow key={tennisPlayer.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">{tennisPlayer.tp_first_name}</TableCell>
                                <TableCell align="center">{tennisPlayer.tp_last_name}</TableCell>
                                <TableCell align="center">{tennisPlayer.tp_rank}</TableCell>
                                <TableCell align="center">{tennisPlayer.tp_date_of_birth}</TableCell>
                                <TableCell align="center">{tennisPlayer.tp_country}</TableCell>
                                <TableCell align="center">{tennisPlayer.tp_gender}</TableCell>
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
    )
}