import { Autocomplete, Button, Card, CardActions, CardContent, Container, IconButton, TextField, MenuProps } from "@mui/material";
import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Coach } from "../../models/Coach";
import { TennisPlayer } from "../../models/TennisPlayer";
import { BACKEND_API_URL } from "../../constants";
import { debounce } from "lodash";

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
	const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
	const [players, setPlayers] = useState<TennisPlayer[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const [query, setQuery] = useState("");
	const inputRef = useRef(null);

	const fetchSuggestions = async (query: string) => {
		try {
			let url = `${BACKEND_API_URL}/playerOrdName/${query}/?page=${page}&page_size=${pageSize}`;
			const response = await fetch(url);
			const {count, next, previous, results} = await response.json();
			setPlayers(results);
			setQuery(query);
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
            await axios.post(`${BACKEND_API_URL}/coach/`, coach);
            navigate("/coaches");
        } catch (error) {
            console.log(error);
        }
    };

	const handleInputChange = (event: any, value: any, reason: any) => {
		console.log("input", value, reason);
		if (reason === "input") {
			debouncedFetchSuggestions(value);
			setQuery(value);
		}
	};

	const fetchMoreData = async (query: string) => {
		const nextPage = page + 1;
		const response = await fetch(`${BACKEND_API_URL}/playerOrdName/${query}/?page=${nextPage}&page_size=${pageSize}`);
		const {count, next, previous, results} = await response.json();
		setPlayers((prevData) => [...prevData, ...results]);
		setPage(nextPage);
	  };

	const handleMenuScroll = (event: any) => {
		const {scrollTop, scrollHeight, clientHeight} = event.target;
		if (scrollTop + clientHeight === scrollHeight && page < totalPages) {
			fetchMoreData(query);
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
							getOptionLabel={(option: any) => `${option.tp_last_name} - ${option.tp_first_name}`}
							filterOptions={(options, state) => options.filter((option: any) => option.tp_last_name.toLowerCase().includes(state.inputValue.toLowerCase()))}
							onInputChange={handleInputChange}
							onChange={(event, value: any) => {
								if (value) {
									console.log(value);
									setCoach({...coach, player: value.id})
								}
							}}
							{...(Autocomplete as any).props}
							MenuProps={{
								onScroll: (event: any) => {
								  const { scrollTop, clientHeight, scrollHeight } = event.target;
								  if (scrollTop + clientHeight === scrollHeight) {
									fetchMoreData(query);
								  }
								},
								style: { maxHeight: 200, overflow: 'auto' }
							  }}
						/>

						<Button type="submit">Add Coach</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
    );
}