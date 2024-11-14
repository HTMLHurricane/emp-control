import { ISchedule } from '@/entities/schedule/model/types'
import { IdName } from '@/shared/types/Types'

export interface IEmployee {
  id: number
  name: string
  position: IdName
  branch: IdName
  phone: number
  schedule: ISchedule
}

export interface IEmployeeForm {
  id?: number
  name: string
  position_id: number
  branch_id: number
  phone: number
  schedule: ISchedule
  schedule_id?: number
}

export interface IEmployeeFormData {
  id?: number
  branch_id: number
  name: string
  phone: string
  position_id: number
  schedule: number
}

export interface IEmployeeSliceState {
  isCreatingEmployee: boolean
  isUpdatingEmployee: boolean
  employeeForm: IEmployeeForm | null
  employeeTablePage: number
  employeeTableLimit: number
}

export interface IEmployeeParams {
  page?: number
  per_page?: number
  id?: number
}
