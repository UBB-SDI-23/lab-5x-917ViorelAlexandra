import { Autocomplete, Button, Card, CardActions, CardContent, CircularProgress, Container, IconButton, TextField } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Coach } from "../../models/Coach";
import { CoachFull } from "../../models/CoachFull";
import { TennisPlayer } from "../../models/TennisPlayer";
import { BACKEND_API_URL } from "../../constants";
import { debounce } from "lodash";

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

	const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
	const [players, setPlayers] = useState<TennisPlayer[]>([]);

	const fetchSuggestions = async (query: string) => {
		try {
			let url = `${BACKEND_API_URL}/playerOrdName/${query}/?page=${page}&page_size=${pageSize}`;
			const response = await fetch(url);
			const {count, next, previous, results} = await response.json();
			setPlayers(results);
			console.log(results);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	}

	const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

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

	useEffect(() => {
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

    const updateCoach =async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/coach/${coachId}/`, coach);
            navigate(`/coaches/${coachId}`);
        } catch (error) {
            console.log(error);
        }
    };

	const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);
		if (reason === "input") {
			debouncedFetchSuggestions(value);
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

						<Autocomplete
							id="player"
							options={players}
							renderInput={(params) => <TextField {...params} label="Player" variant="outlined" />}
							getOptionLabel={(option) => `${option.tp_last_name} - ${option.tp_first_name}`}
							filterOptions={(options, state) => options.filter((option) => option.tp_last_name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChange}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setCoach({...coach, player: value.id})
								}
							}}
						/>

						<Button type="submit">Update Coach</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    )
};