import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Tournament } from "../../models/Tournament";
import { TournamentFull } from "../../models/TournamentFull";
import { BACKEND_API_URL } from "../../constants";

export const TournamentDetail = () => {
    const {tournamentId} = useParams();
    const [tournament, setTournament] = useState<TournamentFull>();

    useEffect(() => {
        const fetchTournament =async () => {
            const response = await fetch(`${BACKEND_API_URL}/tournament/${tournamentId}/`);
            const tournament = await response.json();
            setTournament(tournament);
            console.log(tournament);
        };
        fetchTournament();
    }, [tournamentId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/tournaments`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}>Tournament Details</h1>
                <p style={{textAlign:"left"}}>Name: {tournament?.t_name}</p>
                <p style={{textAlign:"left"}}>Country: {tournament?.t_country}</p>
                <p style={{textAlign:"left"}}>Start date: {tournament?.t_start_date}</p>
                <p style={{textAlign:"left"}}>End date: {tournament?.t_end_date}</p>
                <p style={{textAlign:"left"}}>Type: {tournament?.t_type}</p>
                <p style={{textAlign:"left"}}>Players:</p>
                <ul>
                    {tournament?.players?.map((player) => (
                        <li style={{textAlign:"left"}} key={player.id}>{player.tp_first_name} {player.tp_last_name}</li>
                    ))}
                </ul>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/tournaments/${tournamentId}/edit`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/tournaments/${tournamentId}/delete`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};