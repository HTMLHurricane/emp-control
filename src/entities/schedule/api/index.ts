import { api } from '@/shared'
import { IData } from '@/shared/types/Types'
import { ISchedule, IScheduleForm } from '../model/types'

export const ScheduleAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSchedules: builder.query<IData<ISchedule[]>, void>({
      query: () => ({
        url: 'users/count',
      }),
      providesTags: ['schedule'],
    }),
    createSchedule: builder.mutation<unknown, IScheduleForm>({
      query: (body) => ({
        url: 'schedule/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['schedule'],
    }),
    updateSchedule: builder.mutation<unknown, any>({
      query: ({ id, data }) => ({
        url: `schedule/update/${id}`,
        method: 'PUT',
        body: { ...data },
      }),
      invalidatesTags: ['schedule'],
    }),
    deleteSchedule: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `schedule/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['schedule'],
    }),
  }),
})

export const {
  useCreateScheduleMutation,
  useGetAllSchedulesQuery,
  useDeleteScheduleMutation,
  useUpdateScheduleMutation,
} = ScheduleAPI
