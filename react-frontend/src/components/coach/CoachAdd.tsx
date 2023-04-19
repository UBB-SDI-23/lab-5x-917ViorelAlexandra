import { Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Coach } from "../../models/Coach";
import { BACKEND_API_URL } from "../../constants";

export const CoachAdd = () => {
    const navigate = useNavigate();
    const [coach, setCoach] = useState({
        c_first_name:"",
        c_last_name:"",
        c_date_of_birth:"",
        c_years_of_experience:1,
        c_email:"",
        c_description:"",
        player: 1,
    });

    const addCoach =async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/coach/`, coach);
            navigate("/coaches");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/coaches`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<form onSubmit={addCoach}>
						<TextField
							id="c_first_name"
							label="First name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, c_first_name: event.target.value })}
						/>
						<TextField
							id="c_last_name"
							label="Last name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, c_last_name: event.target.value })}
						/>

                        <TextField
							id="tp_date_of_birth"
							label="Date of birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, c_date_of_birth: event.target.value })}
						/>

                        <TextField
							id="c_years_of_experience"
							label="Years of experience"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, c_years_of_experience: Number(event.target.value) })}
						/>

                        <TextField
							id="c_email"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, c_email: event.target.value })}
						/>

                        <TextField
							id="c_description"
							label="Description"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, c_description: event.target.value })}
						/>

                        <TextField
							id="player"
							label="Player"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setCoach({ ...coach, player: Number(event.target.value) })}
						/>

						<Button type="submit">Add Coach</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}