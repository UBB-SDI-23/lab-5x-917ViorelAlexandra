import { Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Coach } from "../../models/Coach";
import { CoachFull } from "../../models/CoachFull";
import { BACKEND_API_URL } from "../../constants";

export const CoachUpdate = () => {
    const navigate = useNavigate();
    const {coachId} = useParams();

    const [loading, setLoading] = useState(true);
    const [coach, setCoach] = useState({
        c_first_name:"",
        c_last_name:"",
        c_date_of_birth:"",
        c_years_of_experience:1,
        c_email:"",
        player:1,
        c_description:"",
    });

    useEffect(() => {
        const fetchCoach = async () => {
            const response = await fetch(`${BACKEND_API_URL}/coach/${coachId}/`);
            const coach = await response.json();
            setCoach({
                c_first_name: coach.c_first_name,
                c_last_name: coach.c_last_name,
                c_date_of_birth: coach.c_date_of_birth,
                c_years_of_experience: coach.c_years_of_experience,
                c_email: coach.c_email,
                player: coach.player,
                c_description: coach.c_description,
            })
            setLoading(false);
            console.log(coach);
        };
        fetchCoach();
    }, [coachId]);

    const updateCoach =async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/coach/${coachId}/`, coach);
            navigate(`/coaches/${coachId}`);
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
					<form onSubmit={updateCoach}>
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

						<Button type="submit">Update Coach</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    )
};