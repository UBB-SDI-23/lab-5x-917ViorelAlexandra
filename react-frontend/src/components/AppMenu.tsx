import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsIcon from '@mui/icons-material/Sports';
import InsightsIcon from '@mui/icons-material/Insights';
import FestivalIcon from '@mui/icons-material/Festival';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export const AppMenu = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
		<Box>
			<AppBar style={{backgroundColor:"#B17BED"}}>
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
						Tennis Tournaments management
					</Typography>
					<Button
						variant={path.startsWith("/tennisplayers") ? "outlined" : "text"}
						to="/tennisplayers"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<EmojiEventsIcon />}>
						Tennis Players
					</Button>
					<Button
						variant={path.startsWith("/coaches") ? "outlined" : "text"}
						to="/coaches"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<SportsIcon />}>
						Coaches 
					</Button>
					<Button
						variant={path.startsWith("/tournaments") ? "outlined" : "text"}
						to="/tournaments"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<FestivalIcon />}>
						Tournaments 
					</Button>
					<Button
						variant={path.startsWith("/tournamentregs") ? "outlined" : "text"}
						to="/tournamentregs"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<BorderColorIcon />}>
						Registrations 
					</Button>
					<Button
						variant={path.startsWith("/tennisplayers") ? "outlined" : "text"}
						to="/tennisplayers/avgyoecoaches"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<InsightsIcon />}>
						Players Ordered By Avg Experience Coach
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};