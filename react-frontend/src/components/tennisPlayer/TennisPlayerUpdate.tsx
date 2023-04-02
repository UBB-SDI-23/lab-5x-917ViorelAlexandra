import { Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { TennisPlayer } from "../../models/TennisPlayer";
import { TennisPlayerFull } from "../../models/TennisPlayerFull";

export const TennisPlayerUpdate = () => {
    const navigate = useNavigate();
    const {tennisPlayerId} = useParams();

    const [loading, setLoading] = useState(true);
    const [tennisPlayer, setTennisPlayer] = useState({
        tp_first_name:"",
        tp_last_name:"",
        tp_rank:1,
        tp_date_of_birth:"",
        tp_country:"",
        tp_gender:"",
    });

    useEffect(() => {
        const fetchTennisPlayer = async () => {
            const response = await fetch(`../api/tennisplayer/${tennisPlayerId}/`);
            const tennisPlayer = await response.json();
            setTennisPlayer({
                tp_first_name: tennisPlayer.tp_first_name,
                tp_last_name: tennisPlayer.tp_last_name,
                tp_rank: tennisPlayer.tp_rank,
                tp_date_of_birth: tennisPlayer.tp_date_of_birth,
                tp_country: tennisPlayer.tp_country,
                tp_gender: tennisPlayer.tp_gender
            })
            setLoading(false);
            console.log(tennisPlayer);
        };
        fetchTennisPlayer();
    }, [tennisPlayerId]);

    const updateTennisPlayer =async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`../api/tennisplayer/${tennisPlayerId}/`, tennisPlayer);
            navigate(`/tennisplayers/${tennisPlayerId}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/tennisplayers`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={updateTennisPlayer}>
						<TextField
							id="tp_first_name"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTennisPlayer({ ...tennisPlayer, tp_first_name: event.target.value })}
						/>
						<TextField
							id="tp_last_name"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTennisPlayer({ ...tennisPlayer, tp_last_name: event.target.value })}
						/>

                        <TextField
							id="tp_rank"
							label="Rank"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTennisPlayer({ ...tennisPlayer, tp_rank: Number(event.target.value) })}
						/>

                        <TextField
							id="tp_date_of_birth"
							label="Date of birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTennisPlayer({ ...tennisPlayer, tp_date_of_birth: event.target.value })}
						/>

                        <TextField
							id="tp_country"
							label="Country"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTennisPlayer({ ...tennisPlayer, tp_country: event.target.value })}
						/>

                        <TextField
							id="tp_gender"
							label="Gender"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTennisPlayer({ ...tennisPlayer, tp_gender: event.target.value })}
						/>

						<Button type="submit">Update Tennis Player</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    )
};