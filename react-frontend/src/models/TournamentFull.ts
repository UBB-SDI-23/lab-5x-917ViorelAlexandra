import { TennisPlayer } from "./TennisPlayer";
import { User } from "./User";

export interface TournamentFull {
    id: number;
    t_name: string;
    t_country: string;
    t_start_date: string;
    t_end_date: string;
    t_type: string;
    players: TennisPlayer[];
    added_by: User;
}