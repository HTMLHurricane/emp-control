export interface ICountStatisticsData {
    clients: Client[];
    total_clients: number;
    regular_clients: number;
    new_clients: number;
    male_percentage: number;
    female_percentage: number;
    male_count: number;
    female_count: number;
    age_statistics: { [key: string]: number };
    peak_attendance: PeakAttendance[];
}

export interface Client {
    id: number;
    clients_id: number;
    device_id: number;
    date: Date;
    score: number;
    status: Status;
    created_at: Date;
    updated_at: Date;
    clients: Clients;
}

export interface Clients {
    id: number;
    gender: Gender;
    age: number;
    created_at: Date;
    updated_at: Date;
}

export enum Gender {
    Female = 'female',
}

export enum Status {
    New = 'new',
}

export interface PeakAttendance {
    time: string;
    client_count: number;
}

export interface ICountStatisticsParams {
    day?: string;
    start_date?: string;
    end_date?: string;
}
