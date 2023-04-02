import { Coach } from "./Coach";
import { Tournament } from "./Tournament";

export interface TennisPlayerFull {
    id: number;
    tp_first_name: string;
    tp_last_name: string;
    tp_rank: number;
    tp_date_of_birth: string;
    tp_country: string;
    tp_gender: string;
    tournaments: Tournament[];
    coaches: Coach[];
}