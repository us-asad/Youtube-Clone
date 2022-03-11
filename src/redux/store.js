import { configureStore } from '@reduxjs/toolkit'
import channelDetailsReducer from "./slices/channelSlice";
import commentsListReducer from "./slices/commentsSlice";
import {
	homeVideoReducer,
	selectedVideoReducer,
	relatedVideosReducer,
	searchVideosReducer,
	channelVideosReducer
} from "./slices/videosSlice";

const rootReducer = {
	homeVideos: homeVideoReducer,
	selectedVideo: selectedVideoReducer,
	channelDetails: channelDetailsReducer,
	commentsList: commentsListReducer,
	relatedVideos: relatedVideosReducer,
	searchVideos: searchVideosReducer,
	channelVideos: channelVideosReducer
};

const store = configureStore({ 
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production'
})

// const store = createStore(
// 	rootReducer,
// 	compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );

export default store;