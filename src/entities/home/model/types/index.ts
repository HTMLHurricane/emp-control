import { IEmployee } from '@/entities/employee/model/types';
import { IdName } from '@/shared/types/Types';
import dayjs from 'dayjs';

export interface IDoughnut {
    allUsers: number;
    allComers: number;
    lateComers: number;
    notComers: number;
}

export interface IDayBranch {
    day: string;
    branch?: number;
    limit?: number;
}

export interface ILine extends IdName {
    attendance: {
        come: string;
        late: string;
    };
    branch: IdName;
    position: IdName;
    schedule: {
        time_in: string;
        time_out: string;
    };
}

export interface ILineCardProps {
    key: number;
    data: ILine;
}

export interface ILast extends IdName {
    attendance_image: string[];
    branch: string;
    position: string;
    score: number;
    time: string;
    user_image: string[];
}

export interface IMonth {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
    branches: {
        all_workers: number;
        not_comers: number;
        branch_id: number;
        branch_name: string;
        al_comers: number;
        late_percentage: number;
    }[];
}

export interface IHomeSliceInitState {
    collapsed: boolean;
    homeDate: dayjs.Dayjs;
    homeMonthData: dayjs.Dayjs;
    branch: number | undefined;
    attendanceBranch: number | undefined;
    isNotComeModal: boolean;
    isLateModal: boolean;
    isComeModal: boolean;
}

export interface IHomeNotComeData {
    current_page: number;
    data: IEmployee[];
    last_page: number;
    per_page: number;
    success: boolean;
    total: number;
}

export interface IHomeLate {
    attendance_time: string;
    late_by_time: string;
    name: string;
    position: string;
    time_in: string;
    user_id: number;
}

export interface IHomeDoughnutData<T> {
    current_page: number;
    data: T[];
    last_page: number;
    per_page: number;
    success: boolean;
    total: number;
}

export interface IAttendanceWorkDay {
    late_workers: number | null;
    total_workers: number;
    work_day: string;
    workers_count: number;
}

export interface IAttendance extends IdName {
    work_days: IAttendanceWorkDay[];
}
