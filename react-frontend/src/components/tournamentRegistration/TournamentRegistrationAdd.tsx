import { Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { TennisPlayer } from "../../models/TennisPlayer";
import { Tournament } from "../../models/Tournament";
import { TournamentRegistration } from "../../models/TournamentRegistration";
import { BACKEND_API_URL } from "../../constants";
import { debounce } from "lodash";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TournamentRegistrationAdd = () => {
    const navigate = useNavigate();
    const [tournamentReg, setTournamentReg] = useState({
        tr_registration_date:"",
        tr_last_year_performance:"",
        tr_player: 1,
        tr_tournament: 1,     
    });
	const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
	const [players, setPlayers] = useState<TennisPlayer[]>([]);
	const [tournaments, setTournaments] = useState<Tournament[]>([]);

	const fetchSuggestionsPlayer = async (query: string) => {
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

	const fetchSuggestionsTournament = async (query: string) => {
		try {
			let url = `${BACKEND_API_URL}/tournamentOrdName/${query}/?page=${page}&page_size=${pageSize}`;
			const response = await fetch(url);
			const {count, next, previous, results} = await response.json();
			setTournaments(results);
			console.log(results);
		} catch (error) {
			console.error("Error fetching suggestions:", error);
		}
	}

	const debouncedFetchSuggestionsPlayer = useCallback(debounce(fetchSuggestionsPlayer, 500), []);

	const debouncedFetchSuggestionsTournament = useCallback(debounce(fetchSuggestionsTournament, 500), []);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestionsPlayer.cancel();
		};
	}, [debouncedFetchSuggestionsPlayer]);

	useEffect(() => {
		return () => {
			debouncedFetchSuggestionsTournament.cancel();
		};
	}, [debouncedFetchSuggestionsTournament]);


    const addTournamentRegistration =async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_API_URL}/tournamentreg/`, tournamentReg);
			if (response.status < 200 || response.status >= 300) {
				throw new Error("An error occured while adding the coach!");
			} else {
				navigate("/tournamentregs");
			}
        } catch (error) {
			toast.error((error as {message: string}).message);
            console.log(error);
        }
    };

	const handleInputChangePlayer = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);
		if (reason === "input") {
			debouncedFetchSuggestionsPlayer(value);
		}
	};

	const handleInputChangeTournament = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);
		if (reason === "input") {
			debouncedFetchSuggestionsTournament(value);
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

						<Autocomplete
							id="player"
							options={players}
							renderInput={(params) => <TextField {...params} label="Player" variant="outlined" />}
							getOptionLabel={(option) => `${option.tp_last_name} - ${option.tp_first_name}`}
							filterOptions={(options, state) => options.filter((option) => option.tp_last_name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChangePlayer}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setTournamentReg({...tournamentReg, tr_player: value.id})
								}
							}}
						/>

						<Autocomplete
							id="tournament"
							options={tournaments}
							renderInput={(params) => <TextField {...params} label="Tournament" variant="outlined" />}
							getOptionLabel={(option) => `${option.t_name} - ${option.t_type}`}
							filterOptions={(options, state) => options.filter((option) => option.t_name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChangeTournament}
							onChange={(event, value) => {
								if (value) {
									console.log(value);
									setTournamentReg({...tournamentReg, tr_tournament: value.id})
								}
							}}
						/>

						<ToastContainer />

						<Button type="submit">Add Registration</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}