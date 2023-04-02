import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { TennisPlayer } from "../../models/TennisPlayer";

export const TennisPlayerAdd = () => {
    const navigate = useNavigate();
    const [tennisPlayer, setTennisPlayer] = useState({
        tp_first_name:"",
        tp_last_name:"",
        tp_rank:1,
        tp_date_of_birth:"",
        tp_country:"",
        tp_gender:"",
    });

    const addTennisPlayer =async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.post(`../api/tennisplayer/`, tennisPlayer);
            navigate("/tennisplayers");
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
					<form onSubmit={addTennisPlayer}>
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

						<Button type="submit">Add Tennis Player</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}