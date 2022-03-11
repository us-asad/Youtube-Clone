import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import { Row, Col } from "react-bootstrap";
import {Helmet} from "react-helmet"
import VideoMetaData from "../../components/videoMetaData/VideoMetaData";
import VideoHorizontal from "../../components/videoHorizontal/VideoHorizontal";
import Comments from "../../components/comments/Comments";
import Loader from "../../components/loader/Loader";
import "./watchScreen.scss";
import {fetchVideoById,fetchRelatedVideos} from "../../redux/slices/videosSlice";

export default function WatchScreen() {
	const dispatch = useDispatch();
	const {videos,loading:relatedVideosLoading} = useSelector(state => state.relatedVideos);
	const {video,loading} = useSelector(state => state.selectedVideo);

	const {id} = useParams();

	useEffect(() => {
		dispatch(fetchVideoById(id));
		
		dispatch(fetchRelatedVideos(id));
	},[dispatch,id]);

	return (
		<Row>	
			<Helmet>
				<title>{`${video?.snippet?.title}`} • YouTube</title>
			</Helmet>
			<Col lg={8}>
				<div className="watchScreen__player mt-3">
					<iframe 
						src={`https://www.youtube.com/embed/${id}`}
						title={video?.snippet?.title}
						frameBorder="0"
						allowFullScreen
						width="100%"
						height="100%"
					></iframe>
				</div>

				{!loading ? <VideoMetaData video={video} videoId={id} /> : <Loader /> }
				<Comments videoId={id} commentsCount={video?.statistics?.commentCount} />
			</Col>
			<Col lg={4}>
				{!relatedVideosLoading ? videos?.filter(video => video.snippet)
					.map(video => <VideoHorizontal key={video.id.videoId} video={video} />)
					: (
						<SkeletonTheme color="#343a40" highlightColor="#404850">
							<Skeleton width="100%" height="130px" count={15} />
						</SkeletonTheme>
					)
				}
			</Col>
		</Row>
	);
}