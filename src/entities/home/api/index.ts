import { api } from '@/shared'
import {
  IDoughnut,
  IDayBranch,
  ILine,
  ILast,
  IMonth,
  IHomeNotComeData,
  IHomeDoughnutData,
  IHomeLate,
  IAttendance,
} from '../model'
import { IData } from '@/shared/types/Types'
import { IEmployee } from '@/entities/employee/model/types'

export const HomeAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getDoughnutData: builder.query<IDoughnut, IDayBranch>({
      query: ({ day, branch }) => ({
        url: 'daily',
        params: {
          day,
          id: branch,
        },
      }),
    }),
    getLineData: builder.query<IData<ILine[]>, IDayBranch>({
      query: ({ day, branch }) => ({
        url: 'users/attendance',
        params: {
          day,
          id: branch,
        },
      }),
    }),
    getLastData: builder.query<IData<ILast[]>, IDayBranch>({
      query: ({ day, branch }) => ({
        url: 'attendances/last',
        params: {
          day,
          id: branch,
        },
      }),
    }),
    getMonthData: builder.query<IData<IMonth>, IDayBranch>({
      query: ({ day }) => ({
        url: 'monthly',
        params: { month: day },
      }),
    }),
    getNotComeData: builder.query<IHomeNotComeData, IDayBranch>({
      query: ({ day, branch, limit }) => ({
        url: 'note/comers',
        params: {
          day,
          id: branch,
          per_page: limit,
        },
      }),
    }),
    getLateData: builder.query<IHomeDoughnutData<IHomeLate>, IDayBranch>({
      query: ({ day, branch, limit }) => ({
        url: 'late/comers',
        params: {
          day,
          id: branch,
          per_page: limit,
        },
      }),
    }),
    getComeData: builder.query<IHomeDoughnutData<IEmployee>, IDayBranch>({
      query: ({ day, branch, limit }) => ({
        url: 'comers',
        params: {
          day,
          id: branch,
          per_page: limit,
        },
      }),
    }),
    getAttendanceData: builder.query<IData<IAttendance[]>, IDayBranch>({
      query: ({ day, branch }) => ({
        url: 'daily/graph',
        params: {
          month: day,
          id: branch,
        },
      }),
    }),
  }),
})

export const {
  useGetDoughnutDataQuery,
  useGetLineDataQuery,
  useGetLastDataQuery,
  useGetMonthDataQuery,
  useGetLateDataQuery,
  useGetNotComeDataQuery,
  useGetComeDataQuery,
  useGetAttendanceDataQuery,
} = HomeAPI
