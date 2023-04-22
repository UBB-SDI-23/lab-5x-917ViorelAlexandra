import { Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { TournamentRegistration } from "../../models/TournamentRegistration";
import { BACKEND_API_URL } from "../../constants";

export const TournamentRegistrationAdd = () => {
    const navigate = useNavigate();
    const [tournamentReg, setTournamentReg] = useState({
        tr_registration_date:"",
        tr_last_year_performance:"",
        tr_player: 1,
        tr_tournament: 1,     
    });

    const addTournamentRegistration =async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/tournamentreg/`, tournamentReg);
            navigate("/tournamentregs");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/tournamentregs`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addTournamentRegistration}>
						<TextField
							id="tr_registration_date"
							label="Registration date"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournamentReg({ ...tournamentReg, tr_registration_date: event.target.value })}
						/>
						<TextField
							id="tr_last_year_performance"
							label="Last year performance"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournamentReg({ ...tournamentReg, tr_last_year_performance: event.target.value })}
						/>

                        <TextField
							id="tr_player"
							label="Player"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournamentReg({ ...tournamentReg, tr_player: Number(event.target.value) })}
						/>

                        <TextField
							id="tr_tournament"
							label="Tournament"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setTournamentReg({ ...tournamentReg, tr_tournament: Number(event.target.value) })}
						/>

						<Button type="submit">Add Registration</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}