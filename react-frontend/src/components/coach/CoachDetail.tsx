import { Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { CoachFull } from "../../models/CoachFull";
import { BACKEND_API_URL } from "../../constants";

export const CoachDetail = () => {
    const {coachId} = useParams();
    const [coach, setCoach] = useState<CoachFull>();

    useEffect(() => {
        const fetchCoach =async () => {
            const response = await fetch(`${BACKEND_API_URL}/coach/${coachId}/`);
            const coach = await response.json();
            setCoach(coach);
            console.log(coach);
        };
        fetchCoach();
    }, [coachId]);

    return (
        <Container>
        <Card>
            <CardContent>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/coaches`}>
                    <ArrowBackIcon />
                </IconButton>{" "}
                <h1 style={{textAlign:"center"}}>Coach Details</h1>
                <p style={{textAlign:"left"}}>First Name: {coach?.c_first_name}</p>
                <p style={{textAlign:"left"}}>Last Name: {coach?.c_last_name}</p>
                <p style={{textAlign:"left"}}>Date of birth: {coach?.c_date_of_birth}</p>
                <p style={{textAlign:"left"}}>Years of experience: {coach?.c_years_of_experience}</p>
                <p style={{textAlign:"left"}}>Email: {coach?.c_email}</p>
                <p style={{textAlign:"left"}}>Description: {coach?.c_description}</p>
                <p style={{textAlign:"left"}}>Player: {coach?.player?.tp_first_name} {coach?.player?.tp_last_name}</p>

            </CardContent>
            <CardActions>
                <IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coachId}/edit`}>
                    <EditIcon />
                </IconButton>

                <IconButton component={Link} sx={{ mr: 3 }} to={`/coaches/${coachId}/delete`}>
                    <DeleteForeverIcon sx={{ color: "red" }} />
                </IconButton>
            </CardActions>
        </Card>
    </Container>
    );
};