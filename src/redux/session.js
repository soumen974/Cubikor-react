import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch IP address
export const fetchIpAddress = createAsyncThunk(
  'systemData/fetchIpAddress',
  async () => {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  }
);

const systemDataSlice = createSlice({
  name: 'systemData',
  initialState: {
    browserName: '',
    systemDetails: '',
    ipAddress: '',
    status: 'idle', // idle | loading | succeeded | failed
    error: null
  },
  reducers: {
    setBrowserName: (state, action) => {
      state.browserName = action.payload;
    },
    setSystemDetails: (state, action) => {
      state.systemDetails = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIpAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIpAddress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ipAddress = action.payload;
      })
      .addCase(fetchIpAddress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setBrowserName, setSystemDetails } = systemDataSlice.actions;

export default systemDataSlice.reducer;
