import { apiSlice } from "../app/api/apiSlice";

export const rewardsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserRewards: builder.query({
      query: (userId) => ({
        url: `/api/rewards/${userId}`,
        method: 'GET',
      }),
      providesTags: ['Rewards'],
    }),
  }),
});

export const { 
  useGetUserRewardsQuery 
} = rewardsApiSlice;