import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { UserFull } from '../models/UserFull';
import { Card, CardContent, Container, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { BACKEND_API_URL } from '../constants';

export const UserProfile = () => {

    const {userId} = useParams();
    const [user, setUser] = useState<UserFull>({
        id: 1,
        username: '',
        u_first_name: '',
        u_last_name: '',
        u_date_of_birth: '',
        u_bio: '',
        u_location: '',
        tennis_player_count: 1,
        coach_count: 1,
        tournament_count: 1
    });

    useEffect(() => {
        const fetchUser =async () => {
            const response = await fetch(`${BACKEND_API_URL}/profile/${userId}/`);
            const u = await response.json();
            setUser(u);
            console.log(u);
        };
        fetchUser();
    }, [userId]);

    return (
			<>
				<Container>
				<Card style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
					<CardContent style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
						<TextField
							id="username"
							label="Username"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.username}
							InputProps={{
								readOnly: true,
							}}
						/>

						<TextField
							id="firstName"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.u_first_name}
							InputProps={{
								readOnly: true,
							}}
						/>

						<TextField
							id="lastName"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.u_last_name}
							InputProps={{
								readOnly: true,
							}}
						/>

						<TextField
							id="date_of_birth"
							label="Date of Birth"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.u_date_of_birth}
							InputProps={{
								readOnly: true,
							}}
						/>

						<TextField
							id="bio"
							label="Bio"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.u_bio}
							InputProps={{
								readOnly: true,
							}}
						/>

						<TextField
							id="location"
							label="Location"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.u_location}
							InputProps={{
								readOnly: true,
							}}
						/>

                        <TextField
							id="tennisplayers"
							label="Tennis Players Count"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.tennis_player_count}
							InputProps={{
								readOnly: true,
							}}
						/>

                        <TextField
							id="coaches"
							label="Coaches Count"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.coach_count}
							InputProps={{
								readOnly: true,
							}}
						/>

                        <TextField
							id="tournaments"
							label="Tournaments Count"
							variant="outlined"
							fullWidth
							sx={{ mb: 2, color: "whitesmoke !important" }}
							value={user?.tournament_count}
							InputProps={{
								readOnly: true,
							}}
						/>

					</CardContent>
				</Card>
			</Container>
			</>
		);
};