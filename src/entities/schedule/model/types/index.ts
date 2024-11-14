import { IdName } from '@/shared/types/Types'

export interface ISchedule extends IdName {
  days: IScheduleDay[]
  users?: number
}

export interface IScheduleForm {
  name: string
  days: Day[]
  id?: number
  user?: number
}

export interface Day {
  day_of_week: string
  time_in?: string
  time_out?: string
  is_work_day: boolean
}

export interface IScheduleDay {
  day: string
  id?: number
  is_work_day: number
  time_in: string
  time_out: string
}

export interface IScheduleSliceState {
  isCreatingSchedule: boolean
  isUpdatingSchedule: boolean
  scheduleForm: ISchedule | null
  scheduleTablePage: number
  scheduleTableLimit: number
}
