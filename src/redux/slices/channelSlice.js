import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from "../../api";

const initialState = {
	channel: {},
	error: "",
	loading: false
}

export const fetchChannel = createAsyncThunk(
  'channel/getChannelDetails',
  async id => {
    const {data} = await request("/channels",{
		params: {
			part: "snippet,statistics,contentDetails,brandingSettings",
			id
		}
	});
	
	return data.items[0];
  }
)


const channelSlice = createSlice({
	name: "channel/getChannelDetails",
	initialState,
	reducer: {},
	extraReducers: {
		[fetchChannel.pending]: state => {
			state.loading = true;
		},
		[fetchChannel.fulfilled]: (state,{payload}) => {
			state.channel = payload;
			state.error = "";
			state.loading = false;
		},
		[fetchChannel.rejected]: state => {
			state.error = "error";
			state.loading = false;
		}
	}
});

export default channelSlice.reducer;