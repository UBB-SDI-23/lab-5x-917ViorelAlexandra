import { User } from "./User";

export interface Tournament {
    id: number;
    t_name: string;
    t_country: string;
    t_start_date: string;
    t_end_date: string;
    t_type: string;
    nb_registers: number;
    added_by: User;
}