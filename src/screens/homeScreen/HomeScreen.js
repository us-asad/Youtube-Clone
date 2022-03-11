import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {Container,Row,Col} from "react-bootstrap";
import CategoriesBar from "../../components/categoriesBar/CategoriesBar";
import Video from "../../components/video/Video";
import SkeletonVideo from "../../components/skeletons/SkeletonVideo";
import {fetchPopularVideos,fetchVideosByCategory} from "../../redux/slices/videosSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import {v4 as uuid} from "uuid";

export default function HomeScreen() {
	const dispatch = useDispatch();
	const {videos,activeCategory,nextPageToken} = useSelector(state => state.homeVideos);

	useEffect(() => {
		dispatch(fetchPopularVideos());
	},[dispatch]);

	const fetchNextData = () => {
		if (activeCategory === "All") 
			dispatch(fetchPopularVideos());
		else {
			dispatch(fetchVideosByCategory(activeCategory,nextPageToken));
		}
	}
	return (
		<Container>
			<CategoriesBar />
				<InfiniteScroll
					dataLength={videos.length}
					next={fetchNextData}
					hasMore={true}
					loader={
						<Row>
							{[...Array(20)].map((item,id) => (
								<Col key={id} lg={3} md={3}>
									<SkeletonVideo />
								</Col>
							))}
						</Row>
					}
				>
					<Row>
						{videos.map(video => (
							<Col key={uuid()} lg={3} md={4}>
								<Video video={video} key={video.id} />
							</Col>
						))}
					</Row>
				</InfiniteScroll>
		</Container>
	);
}