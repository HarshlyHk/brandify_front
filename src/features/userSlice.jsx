import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../config/axiosInstance";

const initialState = {
  user: null,
  token:
    (typeof window !== "undefined" &&
      localStorage.getItem("drip_access_token")) ||
    null,
  userLoading: false,
};

// Thunks
export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (credential, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/google", {
        token: credential,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginWithCredentials = createAsyncThunk(
  "user/loginWithCredentials",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/send-otp", credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/verify-otp", otpData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupWithGoogle = createAsyncThunk(
  "user/signupWithGoogle",
  async (credential, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/google", {
        token: credential,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupWithCredentials = createAsyncThunk(
  "user/signupWithCredentials",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/signup", credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/check-auth");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== "undefined") {
        localStorage.setItem("drip_access_token", action.payload.token);
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("drip_access_token");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("drip_access_token", action.payload.data.token);
        }
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.userLoading = false;
        console.error("Google login failed:", action.payload);
      })
      .addCase(loginWithCredentials.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(loginWithCredentials.fulfilled, (state, action) => {
        state.userLoading = false;
      })
      .addCase(loginWithCredentials.rejected, (state, action) => {
        state.userLoading = false;
        console.error("Normal login failed:", action.payload);
      })
      .addCase(verifyOtp.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("drip_access_token", action.payload.data.token);
        }
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.userLoading = false;
        console.error("OTP verification failed:", action.payload);
      })
      .addCase(signupWithGoogle.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signupWithGoogle.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("drip_access_token", action.payload.data.token);
        }
      })
      .addCase(signupWithGoogle.rejected, (state, action) => {
        state.userLoading = false;
        console.error("Google signup failed:", action.payload);
      })
      .addCase(signupWithCredentials.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signupWithCredentials.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("drip_access_token", action.payload.data.token);
        }
      })
      .addCase(signupWithCredentials.rejected, (state, action) => {
        state.userLoading = false;
        console.error("Normal signup failed:", action.payload);
      })
      .addCase(checkAuth.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.userLoading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("drip_access_token", action.payload.data.token);
        }
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.userLoading = false;
        console.error("Auth check failed:", action.payload);
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
