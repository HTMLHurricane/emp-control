import { api } from '@/shared'
import { IData } from '@/shared/types/Types'
import { IRole, IRoleForm } from '../model/types'

export const RoleAPI = api.injectEndpoints({
  endpoints: builder => ({
    getAllRoles: builder.query<IData<IRole[]>, void>({
      query: () => ({
        url: 'positions',
      }),
      providesTags: ['role'],
    }),
    createRole: builder.mutation<unknown, IRoleForm>({
      query: ({ name }) => ({
        url: 'position/add',
        method: 'POST',
        body: {
          name,
        },
      }),
      invalidatesTags: ['role'],
    }),
    updateRole: builder.mutation<unknown, IRoleForm>({
      query: ({ id, name }) => ({
        url: `position/update/${id}`,
        method: 'PUT',
        body: {
          name,
          location,
        },
      }),
      invalidatesTags: ['role'],
    }),
    deleteRole: builder.mutation<unknown, number>({
      query: id => ({
        url: `position/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['role'],
    }),
  }),
})

export const {
  useGetAllRolesQuery,
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
} = RoleAPI
