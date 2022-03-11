import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from "../../api";

const initialState = {
	comments: [],
	error: "",
	loading: false
};

export const fetchComments = createAsyncThunk(
	"comments/getComments",
	async id => {
		const {data} = await request("/commentThreads",{
			params: {
				part: "snippet",
				videoId: id
			}
		});

		return data.items;
	}
);

const commentsSlice = createSlice({
	name: "comments",
	initialState,
	reducer: {},
	extraReducers: {
		[fetchComments.pending]: state => {state.loading = true},
		[fetchComments.fulfilled]: (state,{payload}) => {
			state.comments = payload;
			state.error = "";
			state.loading = false;
		},
		[fetchComments.rejected]: state => {
			state.error = "error";
			state.loading = false;
		}
	}
});

export default commentsSlice.reducer;