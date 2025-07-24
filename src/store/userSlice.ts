import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string | null;
  isLoggedIn: boolean;
}

const getInitialState = (): UserState => {
  const stored = localStorage.getItem('user');
  if (stored) return JSON.parse(stored);
  return { username: null, isLoggedIn: false };
};

const initialState: UserState = getInitialState();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(state));
    },
    logout(state) {
      state.username = null;
      state.isLoggedIn = false;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;