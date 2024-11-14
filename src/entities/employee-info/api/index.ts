import { api } from '@/shared'
import { IData } from '@/shared/types/Types'
import { IEmployeeInfo, IEmployeeInfoParams } from '../model/types'

export const EmployeeAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeInfo: builder.query<IData<IEmployeeInfo>, IEmployeeInfoParams>({
      query: ({ id, month }) => ({
        url: `user/information/${id}`,
        params: { month },
      }),
      providesTags: ['employee'],
    }),
    deleteImage: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `image/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employee'],
    }),
  }),
})

export const { useGetEmployeeInfoQuery, useDeleteImageMutation } = EmployeeAPI
