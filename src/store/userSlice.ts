import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

const getInitialState = (): UserState => {
  const stored = localStorage.getItem('user');
  if (stored) return JSON.parse(stored);
  return { username: null, token: null, isLoggedIn: false };
};

const initialState: UserState = getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; token: string }>) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout(state) {
      state.username = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      if (state.username) {
        state.isLoggedIn = true;
      }
      localStorage.setItem("user", JSON.stringify(state));
    },

  },
});

export const { login, logout, setAccessToken } = userSlice.actions;
export default userSlice.reducer;