// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: { user: null, token: null },
//     reducers: {
//         setCredentials: (state, action) => {
//             const { user, accessToken } = action.payload;
//             state.user = user;
//             state.token = accessToken;
//         },
//         logOut: (state) => {
//             state.user = null;
//             state.token = null;
//         },
//     }
// });

// export const { setCredentials, logOut } = authSlice.actions;
// export default authSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;

            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', accessToken);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;

            // Remove from localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;

