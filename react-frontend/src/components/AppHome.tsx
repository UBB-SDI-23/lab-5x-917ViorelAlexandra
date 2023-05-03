import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { User } from '../models/User';
import { Card, CardContent, Container, TextField, Typography } from '@mui/material';

export const AppHome = () => {

    const [user, setUser] = useState<User>({
        username: '',
        u_first_name: '',
        u_last_name: '',
        u_date_of_birth: '',
        u_bio: '',
        u_location: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
        const decoded: any = jwt_decode(token);
        const user = decoded['user'];
        setUser(user);
        }
    }, []);

    return (
		<>
		<h1>Welcome back, {user.username} !</h1>
		<Container>
		<Card style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
			<CardContent style={{ backgroundColor: "whitesmoke", color: "whitesmoke" }}>
				<TextField
					id="username"
					label="Username"
					variant="outlined"
					fullWidth
					sx={{ mb: 2, color: "whitesmoke !important" }}
					value={user.username}
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
					value={user.u_first_name}
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
					value={user.u_last_name}
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
					value={user.u_date_of_birth}
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
					value={user.u_bio}
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
					value={user.u_location}
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