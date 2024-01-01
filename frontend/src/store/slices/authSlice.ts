import axios from '@/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
  expired_token: Date;
  limitOpenai?: LimitOpenaiType;
}

export type LimitOpenaiType = {
  count: number;
  date: number;
};

const initialState: AuthState = {
  isAuth: false,
  name: '',
  email: '',
  token: '',
  expired_token: new Date(),
};

const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (token: string) => {
    const { data } = await axios.get('/refresh', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }
);

const resetState = (state: AuthState) => {
  state.isAuth = false;
  state.token = '';
  state.name = '';
  state.email = '';
  state.expired_token = new Date();
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.expired_token = action.payload.expired_token;
    },
    logout: resetState,
  },
  extraReducers(builder) {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.expired_token = action.payload.expired_token;
      })
      .addCase(refreshToken.rejected, resetState);
  },
});

export { refreshToken };
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
