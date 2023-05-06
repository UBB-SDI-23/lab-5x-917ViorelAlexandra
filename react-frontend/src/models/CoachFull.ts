import { TennisPlayer } from "./TennisPlayer";

export interface CoachFull {
    id: number;
    c_first_name: string;
    c_last_name: string;
    c_date_of_birth: string;
    c_years_of_experience: number;
    c_email: string;
    player: TennisPlayer;
    c_description: string;
    added_by: number;
}