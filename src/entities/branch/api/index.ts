import { api } from '@/shared'
import { IData } from '@/shared/types/Types'
import { IBranch, IBranchForm, IBranchParams } from '../model/types'

export const BranchAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBranches: builder.query<IData<IBranch[]>, IBranchParams>({
      query: (params) => ({
        url: 'branches',
        params,
      }),
      providesTags: ['branch'],
    }),
    createBranch: builder.mutation<unknown, IBranchForm>({
      query: ({ name, location }) => ({
        url: 'branch/add',
        method: 'POST',
        body: {
          name,
          location,
        },
      }),
      invalidatesTags: ['branch'],
    }),
    updateBranch: builder.mutation<unknown, IBranchForm>({
      query: ({ id, name, location }) => ({
        url: `branch/update/${id}`,
        method: 'PUT',
        body: {
          name,
          location,
        },
      }),
      invalidatesTags: ['branch'],
    }),
    deleteBranch: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `branch/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['branch'],
    }),
  }),
})

export const {
  useGetAllBranchesQuery,
  useCreateBranchMutation,
  useDeleteBranchMutation,
  useUpdateBranchMutation,
} = BranchAPI
