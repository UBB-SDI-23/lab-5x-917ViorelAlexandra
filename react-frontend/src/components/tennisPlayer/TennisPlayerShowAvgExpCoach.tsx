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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TennisPlayer } from "../../models/TennisPlayer";
import { TennisPlayerStatistic } from "../../models/TennisPlayerStatistic";

export const TennisPlayerShowAvgExpCoach = () => {
    const [loading, setLoading] = useState(true);
    const [tennisPlayers, setTennisPlayers] = useState([]);

    useEffect(() => {
        fetch("../api/playeravg/")
            .then(response => response.json())
            .then(data => {
                setTennisPlayers(data);
                setLoading(false);
            }
            );
    }, []);

    console.log(tennisPlayers);

    return (
        <Container>
        <h1>All Tennis Players Ordered By The Average Years Of Experience Of Their Coaches</h1>
        {loading && <CircularProgress />}

        {!loading && tennisPlayers.length == 0 && <div>No tennis players found!</div>}

        {!loading && tennisPlayers.length > 0 && (
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
                            <TableCell align="center">Average Years Of Experience Coaches</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tennisPlayers.map((tennisPlayer:TennisPlayerStatistic, index) => (
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
                                <TableCell align="center">{tennisPlayer.avg_yoe_coach}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )}
    </Container>
    )
}