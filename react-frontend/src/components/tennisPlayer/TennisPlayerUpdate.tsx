import { Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { TennisPlayer } from "../../models/TennisPlayer";
import { TennisPlayerFull } from "../../models/TennisPlayerFull";
import { BACKEND_API_URL } from "../../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            const response = await fetch(`${BACKEND_API_URL}/tennisplayer/${tennisPlayerId}/`);
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
			if (tennisPlayer.tp_gender != 'M' && tennisPlayer.tp_gender != 'F') {
				throw new Error("Gender must be M or F!");
			}
			if (tennisPlayer.tp_rank < 1) {
				throw new Error("Rank must be at least 1!");
			}
			const response = await axios.put(`${BACKEND_API_URL}/tennisplayer/${tennisPlayerId}/`, tennisPlayer);
			if (response.status < 200 || response.status >= 300) {
				throw new Error("An error occured while updating the tennis player!");
			} else {
				navigate(`/tennisplayers/${tennisPlayerId}`);
			}
        } catch (error) {
			toast.error((error as {message: string}).message);
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

						<ToastContainer />


						<Button type="submit">Update Tennis Player</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    )
};