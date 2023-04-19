import { TennisPlayer } from "./TennisPlayer"
import { Tournament } from "./Tournament"

export interface TournamentRegistration {
    id: number;
    tr_registration_date: string;
    tr_last_year_performance: string;
    tr_player: TennisPlayer;
    tr_tournament: Tournament; 
}