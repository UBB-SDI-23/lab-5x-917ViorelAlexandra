import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Tournament } from "../../models/Tournament";
import { BACKEND_API_URL } from "../../constants";

export const TournamentAdd = () => {
    const navigate = useNavigate();
    const [tournament, setTournament] = useState({
        t_name:"",
        t_country:"",
        t_start_date:"",
        t_end_date:"",
        t_type:"",
    });

    const addTournament =async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/tournament/`, tournament);
            navigate("/tournaments");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/tournaments`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addTournament}>
						<TextField
							id="t_name"
							label="Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournament({ ...tournament, t_name: event.target.value })}
						/>
						<TextField
							id="t_country"
							label="Country"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournament({ ...tournament, t_country: event.target.value })}
						/>

                        <TextField
							id="t_start_date"
							label="Start date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournament({ ...tournament, t_start_date: event.target.value })}
						/>

                        <TextField
							id="t_end_date"
							label="End date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournament({ ...tournament, t_end_date: event.target.value })}
						/>

                        <TextField
							id="t_type"
							label="Type"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournament({ ...tournament, t_type: event.target.value })}
						/>

						<Button type="submit">Add Tournament</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}