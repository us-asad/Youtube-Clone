import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from "../../api";

const homeVideoIS = {
	videos: [],
	loading: false,
	nextPageToken: null,
	activeCategory: "All" 
};

const selectedVideoIS = {
	video: {},
	loading: true
};

const relatedVideoIS = {
	videos: [],
	loading: true
};

const searchVideosIS = {
	videos: [],
	nextPageToken: null,
	totalResults: 20,
	loading: true
};

const channelVideosIS = {
	videos: [],
	loading: true
};


export const fetchPopularVideos = createAsyncThunk(
	"videos/popularVideos",
	async (a,{getState}) => {
		const {data} = await request.get("/videos",{
			params: {
				part: "snippet,contentDetails,statistics",
				chart: "mostPopular",
				regionCode: "US",
				maxResults: 20,
				pageToken: getState().homeVideos.nextPageToken,
			}
		});

		return {
			videos: data.items,
			nextPageToken: data.nextPageToken,
			category: "All"
		};
	}
);

export const fetchVideosByCategory = createAsyncThunk(
	"videos/videosByCategory",
	async (keyword,{getState}) => {
		const {data} = await request.get("/search",{
			params: {
				part: "snippet",
				maxResults: 20,
				pageToken: getState().homeVideos.nextPageToken,
				q: keyword,
				type: "video"
			}
		});

		return {
			videos: data.items,
			nextPageToken: data.nextPageToken,
			category: keyword
		};
	}
);

export const fetchVideoById = createAsyncThunk(
	"videos/getVideoById",
	async id => {
		const {data} = await request("/videos",{
			params: {
				part: "snippet,statistics",
				id
			}
		});
		return data.items[0];
	}
);

export const fetchRelatedVideos = createAsyncThunk(
	"videos/relatedVideos",
	async id => {
		const {data} = await request("/search",{
			params: {
				part: "snippet",
				relatedToVideoId: id,
				maxResults: 15,
				type: "video"
			}
		});

		return data.items;
	}
);

export const fetchVideosBySearch = createAsyncThunk(
	"videos/videosBySearch",
	async ({query,textIsRight,nextPageToken}) => {
		const {data} = await request.get("/search",{
			params: {
				part: "snippet",
				maxResults: 20,
				q: query,
				pageToken: nextPageToken,
				type: "video,channel",
			}
		});

		return {
			videos: data.items,
			nextPageToken: data.nextPageToken,
			totalResults: data.pageInfo.resultsPerPage,
			textIsRight
		};
	}
);

export const getVideosByChannel = createAsyncThunk(
	"videos/videosByChannel",
	async (id,{getState}) => {
		const {data: {items}} = await request("/channels", {
			params: {
				part: "contentDetails",
				id
			}
		});

		const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

		const {data} = await request("/playlistItems", {
			params: {
				part: "contentDetails,snippet",
				playlistId: uploadPlaylistId,
				maxResults: 40
			}
		});

		return {
			videos: data.items,
			id
		};
	}
);

const popularVideosSlice = createSlice({
	name: "videos",
	initialState: homeVideoIS,
	reducer: {},
	extraReducers: {
		[fetchPopularVideos.pending]: state => {
			state.loading = true;
			state.error = "";
		},
		[fetchPopularVideos.fulfilled]: (state,{payload}) => {
			state.videos = state.activeCategory === payload.category ? [...state.videos,...payload.videos] : payload.videos;
			state.nextPageToken = payload.nextPageToken;
			state.loading = false;
			state.activeCategory = payload.category;
			state.error = "";
		},
		[fetchPopularVideos.rejected]: state => {
			state.error = "error";
			state.loading = false;
		},
		[fetchVideosByCategory.pending]: state => {
			state.loading = true;
			state.error = "";
		},
		[fetchVideosByCategory.fulfilled]: (state,{payload}) => {
			state.videos = state.activeCategory === payload.category ? [...state.videos,...payload.videos] : payload.videos;
			state.nextPageToken = payload.nextPageToken;
			state.loading = false;
			state.activeCategory = payload.category;
			state.error = "";
		},
		[fetchVideosByCategory.rejected]: state => {
			state.error = "error";
			state.loading = false;
		},
	}
});

const videoByIdSlice = createSlice({
	name: "videos",
	initialState: selectedVideoIS,
	reducer: {},
	extraReducers: {
		[fetchVideoById.pending]: state => {
			state.loading = true;
			state.error = "";
		},
		[fetchVideoById.fulfilled]: (state,{payload}) => {
			state.video = payload;
			state.loading = false;
			state.error = "";
		},
		[fetchVideoById.rejected]: state => {
			state.error = "error";
			state.loading = false;
		}
	}
});

const relatedVideoSlice = createSlice({
	name: "videos",
	initialState: relatedVideoIS,
	reducer: {},
	extraReducers: {
		[fetchRelatedVideos.pending]: state => {
			state.loading = true;
			state.error = "";
		},
		[fetchRelatedVideos.fulfilled]: (state,{payload}) => {
			state.videos = payload;
			state.loading = false;
			state.error = "";
		},
		[fetchRelatedVideos.rejected]: state => {
			state.error = "error";
			state.loading = false;
		}
	}
});

const videosBySearchSlice = createSlice({
	name: "videos",
	initialState: searchVideosIS,
	reducer: {},
	extraReducers: {
		[fetchVideosBySearch.pending]: state => {
			state.loading = true;
			state.error = "";
		},
		[fetchVideosBySearch.fulfilled]: (state,{payload}) => {
			state.videos = payload.textIsRight ? [...state.videos,...payload.videos] : payload.videos;
			state.nextPageToken = payload.nextPageToken;
			state.totalResults = payload.totalResults;
			state.loading = false;
			state.error = "";
		},
		[fetchVideosBySearch.rejected]: state => {
			state.error = "error";
			state.loading = false;
		}
	}
});

const videosByChannelSlice = createSlice({
	name: "videos",
	initialState: channelVideosIS,
	reducer: {},
	extraReducers: {
		[getVideosByChannel.pending]: state => {
			state.loading = true;
			state.error = "";
		},
		[getVideosByChannel.fulfilled]: (state,{payload}) => {
			state.videos = payload.channelIsTheSame ? [...state.videos,...payload.videos] : payload.videos;
			state.loading = false;
			state.error = "";
		},
		[getVideosByChannel.rejected]: state => {
			state.error = "error";
			state.loading = false;
		}
	}
});


export const homeVideoReducer = popularVideosSlice.reducer;
export const selectedVideoReducer = videoByIdSlice.reducer;
export const relatedVideosReducer = relatedVideoSlice.reducer;
export const searchVideosReducer= videosBySearchSlice.reducer;
export const channelVideosReducer = videosByChannelSlice.reducer;
