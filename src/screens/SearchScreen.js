import {useEffect,useRef} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import VideoHorizontal from "../components/videoHorizontal/VideoHorizontal";
import NotFound from "../components/notFound/NotFound";
import {fetchVideosBySearch} from "../redux/slices/videosSlice";


export default function SearchScreen() {
	const dispatch = useDispatch();
	const {videos,nextPageToken,totalResults} = useSelector(state => state.searchVideos);

	const {query} = useParams();
	const ref = useRef(query);

	const textIsRight = ref.current === query;

	useEffect(() => {
		dispatch(fetchVideosBySearch({query,textIsRight,nextPageToken}));
		ref.current = query;
	 // eslint-disable-next-line
	},[query]);

	function fetchNextData() {
		dispatch(fetchVideosBySearch({query,textIsRight,nextPageToken}));
	}

	return (
		<>
			{totalResults ? (
				<InfiniteScroll
					dataLength={videos.length}
					next={fetchNextData}
					hasMore={true}
					loader={
						<SkeletonTheme color="#343a40" highlightColor="#404850">
							<Skeleton width="100%" height="130px" count={20} />
						</SkeletonTheme>
					}
				>
					{videos?.map((video,i) => <VideoHorizontal key={i} video={video} searchScreen />)}
				</InfiniteScroll>
			) : <NotFound query={query} />}
		</>
	);
}