import { apiSlice } from '../app/api/apiSlice';

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => '/api/notifications',
    }),
    toggleNotificationRead: builder.mutation({
      query: (id) => ({
        url: `/api/notifications/${id}/toggle`,
        method: 'PUT',
      }),
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/api/notifications/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});


export const {
  useGetNotificationsQuery,
  useToggleNotificationReadMutation,
  useDeleteNotificationMutation,
} = notificationsApiSlice;
