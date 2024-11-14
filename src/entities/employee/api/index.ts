import { api } from '@/shared'
import { IData } from '@/shared/types/Types'
import {
  IEmployee,
  IEmployeeForm,
  IEmployeeFormData,
  IEmployeeParams,
} from '../model/types'

export const EmployeeAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllEmployees: builder.query<IData<IEmployee[]>, IEmployeeParams>({
      query: (params) => ({
        url: 'users/control',
        params,
      }),
      providesTags: ['employee'],
    }),
    createEmployee: builder.mutation<any, IEmployeeForm>({
      query: ({ schedule, ...rest }) => ({
        url: 'user/add',
        method: 'POST',
        body: { schedule_id: schedule, ...rest },
      }),
      invalidatesTags: ['employee'],
    }),
    updateEmployee: builder.mutation<any, IEmployeeFormData>({
      query: ({ id, ...rest }) => ({
        url: `user/update/${id}`,
        method: 'PUT',
        body: {
          schedule_id: rest.schedule,
          name: rest.name,
          phone: rest.phone,
          position_id: rest.position_id,
          branch_id: rest.branch_id,
        },
      }),
      invalidatesTags: ['employee'],
    }),
    deleteEmployee: builder.mutation<any, number>({
      query: (id) => ({
        url: `user/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employee'],
    }),
  }),
})

export const {
  useGetAllEmployeesQuery,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} = EmployeeAPI
