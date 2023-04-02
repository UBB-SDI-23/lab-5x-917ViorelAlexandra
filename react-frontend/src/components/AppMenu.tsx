import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsIcon from '@mui/icons-material/Sports';

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<SportsTennisIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Tennis Players management
					</Typography>
					<Button
						variant={path.startsWith("/tennisplayers") ? "outlined" : "text"}
						to="/tennisplayers"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<EmojiEventsIcon />}>
						TennisPlayers
					</Button>

					<Button
						variant={path.startsWith("/tennisplayers") ? "outlined" : "text"}
						to="/tennisplayers/avgyoecoaches"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<SportsIcon />}>
						Players Ordered By Avg Experience Coach
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};