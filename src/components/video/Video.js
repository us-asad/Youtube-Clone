import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../api";
import {AiFillEye} from "react-icons/ai";
import "./_video.scss";

export default function Video({video,channelScreen}) {
	const {
		id,
		snippet: {
			channelId,
			channelTitle,
			title,
			publishedAt,
			thumbnails: {medium}
		},
		contentDetails
	} = video;

	const [views,setViews] = useState(null);
	const [duration,setDuration] = useState(null);
	const [channelIcon,setChannelIcon] = useState(null);

	const seconds = moment.duration(duration).asSeconds();
	const _duration = moment.utc(seconds * 1000).format("mm:ss");

	const _videoId = id?.videoId || contentDetails?.videoId || id;

	const navigate = useNavigate();

	useEffect(() => { 
		const getVideoDetails = async () => {
			const {data: {items}} = await request("/videos",{
				params: {
					part: "contentDetails,statistics",
					id: _videoId
				}
			});

			setDuration(items[0].contentDetails.duration);
			setViews(items[0].statistics.viewCount);
		}

		getVideoDetails();
	},[_videoId]);

	useEffect(() => {
		const getChannelIcon = async () => {
			const {data: {items}} = await request("/channels",{
				params: {
					part: "snippet",
					id: channelId
				}
			});

			setChannelIcon(items[0].snippet.thumbnails.default);
		}

		getChannelIcon();
	},[channelId]);

	function handleVideoClick() {
		navigate(`/watch/${_videoId}`);
	}

	return (
		<div className="video">
			<div onClick={handleVideoClick}>
				<div className="video__top">
					<LazyLoadImage src={medium.url} effect="blur" />
					<span className="video__top__duration">{_duration}</span>
				</div>
				<div dangerouslySetInnerHTML={{ __html: title }} className="video__title" />
				<div className="video__details">
					<span>
						<AiFillEye />&nbsp;
						{numeral(views).format("0.a").toUpperCase()} Views •&nbsp;
					</span>
					<span>{moment(publishedAt).fromNow()}</span>
				</div>
			</div>
			{!channelScreen && (
				<div
					onClick={() => navigate(`/channel/${channelId}`)}
					className="video__channel"
				>
					<LazyLoadImage src={channelIcon?.url} effect="blur" />
					<p>{channelTitle}</p>
				</div>
			)}
		</div>
	);
}