import { Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Tournament } from "../../models/Tournament";
import { TournamentFull } from "../../models/TournamentFull";
import { BACKEND_API_URL } from "../../constants";

export const TournamentUpdate = () => {
    const navigate = useNavigate();
    const {tournamentId} = useParams();

    const [loading, setLoading] = useState(true);
    const [tournament, setTournament] = useState({
        t_name:"",
        t_country:"",
        t_start_date:"",
        t_end_date:"",
        t_type:"",
    });

    useEffect(() => {
        const fetchTournament = async () => {
            const response = await fetch(`${BACKEND_API_URL}/tournament/${tournamentId}/`);
            const tournament = await response.json();
            setTournament({
                t_name: tournament.t_name,
                t_country: tournament.t_country,
                t_start_date: tournament.t_start_date,
                t_end_date: tournament.t_end_date,
                t_type: tournament.t_type
            })
            setLoading(false);
            console.log(tournament);
        };
        fetchTournament();
    }, [tournamentId]);

    const updateTournament =async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/tournament/${tournamentId}/`, tournament);
            navigate(`/tournaments/${tournamentId}`);
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
					<form onSubmit={updateTournament}>
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

						<Button type="submit">Update Tournament</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    )
};