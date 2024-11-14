import { api } from '@/shared';
import { ICountStatisticsData, ICountStatisticsParams } from '../model/types';

export const BranchAPI = api.injectEndpoints({
    endpoints: (builder) => ({
        getCountStatistics: builder.query<
            ICountStatisticsData,
            ICountStatisticsParams
        >({
            query: (params) => ({
                url: 'client/attendance/by_date',
                params,
            }),
        }),
    }),
});

export const { useGetCountStatisticsQuery } = BranchAPI;
