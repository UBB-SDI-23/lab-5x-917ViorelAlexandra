import { User } from "./User";

export interface TennisPlayer {
    id: number;
    tp_first_name: string;
    tp_last_name: string;
    tp_rank: number;
    tp_date_of_birth: string;
    tp_country: string;
    tp_gender: string;
    nb_coaches: number;
    tournaments: number[];
    coaches: number[];
    added_by: User;
}