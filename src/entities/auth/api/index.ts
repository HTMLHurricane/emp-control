import { api } from '@/shared'
import { IAuthData, IAuthForm } from '../model/types/index.types'

export const AuthAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    checkUser: builder.query<unknown, string>({
      query: (token) => ({
        url: 'getme',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    login: builder.mutation<IAuthData, IAuthForm>({
      query: ({ email, password }) => ({
        url: 'employee/login',
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useCheckUserQuery } = AuthAPI
