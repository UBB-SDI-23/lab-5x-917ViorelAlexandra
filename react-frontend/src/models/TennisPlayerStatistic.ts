import { Coach } from "./Coach";

export interface TennisPlayerStatistic {
    id: number;
    tp_first_name: string;
    tp_last_name: string;
    tp_rank: number;
    tp_date_of_birth: string;
    tp_country: string;
    tp_gender: string;
    coaches: Coach[];
    avg_yoe_coach: number;
}