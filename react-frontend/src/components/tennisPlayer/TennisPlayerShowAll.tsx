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
import { TennisPlayer } from "../../models/TennisPlayer";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";



export const TennisPlayerShowAll = () => {
    const [loading, setLoading] = useState(true);
    const [tennisPlayers, setTennisPlayers] = useState([]);

    useEffect(() => {
        fetch("../api/tennisplayer/")
            .then(response => response.json())
            .then(data => {
                setTennisPlayers(data);
                setLoading(false);
            }
            );
    }, []);

    console.log(tennisPlayers);

    const sortTennisPlayer = () => {
        const sortedPlayers = [...tennisPlayers].sort((a: TennisPlayer, b:TennisPlayer) => {
            if (a.tp_rank < b.tp_rank) {
                return -1;
            }
            if (a.tp_rank > b.tp_rank) {
                return 1;
            }
            return 0;

        })
        console.log(sortedPlayers);
        setTennisPlayers(sortedPlayers);
    }

  
    return (
        <Container>
        <h1>All Tennis Players</h1>
        {loading && <CircularProgress />}

        {!loading && tennisPlayers.length == 0 && <div>No tennis players found!</div>}

        {!loading && (
            <IconButton component={Link} sx={{ mr: 3 }} to={`/tennisplayers/add`}>
                        <Tooltip title="Add a new tennis player" arrow>
                            <AddIcon color="primary" />
                        </Tooltip>
                    </IconButton>
        )}

        {!loading && (
            <Button sx={{color:"red"}} onClick={sortTennisPlayer}>
                Sort tennis players
            </Button>
        )}

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
                            <TableCell align="center">Operations</TableCell>
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
                                <TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/tennisplayers/${tennisPlayer.id}`}>
											<Tooltip title="View tennis player details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/tennisplayers/${tennisPlayer.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/tennisplayers/${tennisPlayer.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
                </Table>
            </TableContainer>
        )}
    </Container>
    )
  };