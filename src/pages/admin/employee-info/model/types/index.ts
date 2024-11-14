import { IEmployeeInfo } from '@/entities/employee-info/model/types'
import dayjs from 'dayjs'

export interface IEmployeeInformationProps {
  data: IEmployeeInfo
}

export interface IEmployeeInfoReportsProps {
  data: IEmployeeInfo
  loading: boolean
}

export interface IEmployeeInformationHeadProps {
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
  date: dayjs.Dayjs
}
