import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TennisPlayer } from "../../models/TennisPlayer";
import { TennisPlayerFull} from "../../models/TennisPlayerFull";

export const TennisPlayerDetail = () => {
    const {tennisPlayerId} = useParams();
    const [tennisPlayer, setTennisPlayer] = useState<TennisPlayerFull>();

    useEffect(() => {
        const fetchTennisPlayer =async () => {
            const response = await fetch(`../api/tennisplayer/${tennisPlayerId}/`);
            const tennisPlayer = await response.json();
            setTennisPlayer(tennisPlayer);
            console.log(tennisPlayer);
        };
        fetchTennisPlayer();
    }, [tennisPlayerId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/tennisplayers`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}>Tennis Player Details</h1>
                <p style={{textAlign:"left"}}>First Name: {tennisPlayer?.tp_first_name}</p>
                <p style={{textAlign:"left"}}>Last Name: {tennisPlayer?.tp_last_name}</p>
                <p style={{textAlign:"left"}}>Rank: {tennisPlayer?.tp_rank}</p>
                <p style={{textAlign:"left"}}>Date of birth: {tennisPlayer?.tp_date_of_birth}</p>
                <p style={{textAlign:"left"}}>Country: {tennisPlayer?.tp_country}</p>
                <p style={{textAlign:"left"}}>Gender: {tennisPlayer?.tp_gender}</p>
                <p style={{textAlign:"left"}}>Tournaments:</p>
                <ul>
                    {tennisPlayer?.tournaments?.map((tournament) => (
                        <li style={{textAlign:"left"}} key={tournament.id}>{tournament.t_name}</li>
                    ))}
                </ul>
                <p style={{textAlign:"left"}}>Coaches:</p>
                <ul>
                    {tennisPlayer?.coaches?.map((coach) => (
                        <li style={{textAlign:"left"}} key={coach.id}>{coach.c_first_name} {coach.c_last_name}</li>
                    ))}
                </ul>
            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/tennisplayers/${tennisPlayerId}/edit`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/tennisplayers/${tennisPlayerId}/delete`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};