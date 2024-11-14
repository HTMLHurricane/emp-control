import { ISchedule } from '@/entities/schedule/model/types'
import { IdName, IdUrl } from '@/shared/types/Types'

export interface IEmployeeInfo {
  user: IdName & {
    position: IdName
    branch: IdName
    phone: string
    images: IdUrl[]
    schedule: ISchedule
  }
  dates: {
    day: string
    early: string
    in: string
    late: string
    out: string
    in_images: IdUrl[]
    out_images: IdUrl[]
  }[]
}

export interface IEmployeeInfoParams {
  id: string
  month: string
}
