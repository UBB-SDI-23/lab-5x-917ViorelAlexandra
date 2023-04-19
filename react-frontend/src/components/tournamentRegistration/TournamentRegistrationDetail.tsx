import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TournamentRegistration } from "../../models/TournamentRegistration";
import { BACKEND_API_URL } from "../../constants";

export const TournamentRegDetail = () => {
    const {tournamentRegId} = useParams();
    const [tournamentReg, setTournamentReg] = useState<TournamentRegistration>();

    useEffect(() => {
        const fetchTournamentReg =async () => {
            const response = await fetch(`${BACKEND_API_URL}/tournamentreg/${tournamentRegId}/`);
            const tournamentReg = await response.json();
            setTournamentReg(tournamentReg);
            console.log(tournamentReg);
        };
        fetchTournamentReg();
    }, [tournamentRegId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/tournamentregs`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}>Tournament Registration Details</h1>
                <p style={{textAlign:"left"}}>Registration date: {tournamentReg?.tr_registration_date}</p>
                <p style={{textAlign:"left"}}>Last year performance: {tournamentReg?.tr_last_year_performance}</p>
                <p style={{textAlign:"left"}}>Player: {tournamentReg?.tr_player?.tp_first_name} {tournamentReg?.tr_player?.tp_last_name}</p>
                <p style={{textAlign:"left"}}>Tournament: {tournamentReg?.tr_tournament?.t_name}</p>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/tournamentregs/${tournamentRegId}/delete`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};