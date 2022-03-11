import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import numeral from "numeral";
import {Container,Col,Row} from "react-bootstrap"
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {fetchChannel} from "../../redux/slices/channelSlice";
import {getVideosByChannel} from "../../redux/slices/videosSlice";
import Video from "../../components/video/Video";
import "./channelScreen.scss";

export default function ChannelScreen() {
	const dispatch = useDispatch();
	const {videos,loading} = useSelector(state => state.channelVideos);
	const {snippet,statistics,brandingSettings} = useSelector(state => state.channelDetails.channel);

	const {channelId} = useParams();

	useEffect(() => {
		dispatch(getVideosByChannel(channelId));
		dispatch(fetchChannel(channelId));
	},[dispatch,channelId]);

	return (
		<>
			<div className="px-5 py-2 my-2 channelHeader">
				{brandingSettings?.image?.bannerExternalUrl && (
						<div className="w-100 channelBanner" style={{backgroundImage: `url(${brandingSettings?.image?.bannerExternalUrl})`}}>
					</div>
				)}
				<div className="channelHeader__details px-5 py-2 my-2 d-flex justify-content-between align-items-center">
					<div className="d-flex align-items-center">
						<img className="channelHeader__logo" src={snippet?.thumbnails?.default?.url} alt="channel logo" />
						<div className="ml-3 channelHeader_details">
							<h3>{snippet?.title}</h3>
							{!statistics?.hiddenSubscriberCount && (
								<span>
									{numeral(statistics?.subscriberCount).format("0.a").toUpperCase()}
									&nbsp;Subscribers
								</span>
							)}
						</div>
					</div>
					<button>Subscribe</button>
				</div>
			</div>
			<Container>
				<Row className="mt-2">
					{!loading ? videos?.map((video,i) => (
						<Col key={i} md={3} lg={3}>
							<Video video={video} channelScreen />
						</Col>
					)) : (
						[...Array(20)].map((item,i) => (
							<Col key={i} md={3} lg={3}>
								<SkeletonTheme color="#343a40" highlightColor="#404850">
									<Skeleton width="100%" height="130px"/>
								</SkeletonTheme>
							</Col>
						))
					)}
				</Row>
			</Container>
		</>
	);
}