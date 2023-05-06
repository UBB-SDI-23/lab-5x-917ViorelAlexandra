import { Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Coach } from "../../models/Coach";
import { TennisPlayer } from "../../models/TennisPlayer";
import { BACKEND_API_URL } from "../../constants";
import { debounce } from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
		added_by: 1,
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
		return () => {
			debouncedFetchSuggestions.cancel();
		};
	}, [debouncedFetchSuggestions]);

    const addCoach =async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
			if (coach.c_years_of_experience < 0) {
				throw new Error("Years of experience must be at least 0!");
			}
			const id = localStorage.getItem('user_id');
			if (id) {
				coach.added_by = parseInt(id);
			}
			else {
				coach.added_by = 1;
			}
            const response = await axios.post(`${BACKEND_API_URL}/coach/`, coach);
            if (response.status < 200 || response.status >= 300) {
				throw new Error("An error occured while adding the coach!");
			} else {
				navigate("/coaches");
			}
        } catch (error) {
			toast.error((error as {message: string}).message);
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

						<ToastContainer />

						<Button type="submit">Add Coach</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}