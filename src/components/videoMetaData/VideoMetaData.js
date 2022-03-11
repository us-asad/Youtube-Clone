import {useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import ShowMoreText from "react-show-more-text";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import {FaShare} from "react-icons/fa";
import HelmetCustom from "../HelmetCustom";
import {fetchChannel}from "../../redux/slices/channelSlice";
import "./_videoMetaData.scss";

export default function VideoMetaData({video,videoId}) {
	const dispatch = useDispatch();
	const {snippet: channelSnippet,statistics: channelStatistics} = useSelector(state => state.channelDetails.channel);

	const navigate = useNavigate();

	const {channelId,channelTitle,description,title,publishedAt} = video ? video.snippet : {};	
	const {viewCount,likeCount} = video ? video.statistics : {};


	useEffect(() => {
		dispatch(fetchChannel(channelId));
	},[dispatch,channelId]);

	function copyLink() {
		navigator.clipboard.writeText(`${window.location.href}`);

		const copyAlert = document.querySelector(".videoMetaData__top__copyAlert");

		copyAlert.style.opacity = 1;
		copyAlert.style.bottom = "120%";

		setTimeout(() => {
			copyAlert.style.opacity = 0;
			setTimeout(() => {
				copyAlert.style.bottom = 0;
			},500);
		},500);
	}

	return (
		<div className="videoMetaData py-2">
			<HelmetCustom title={title} description={description} />
			<div className="videoMetaData__top">
				<h5>{title}</h5>
				<div className="d-flex justify-content-between align-items-center py-1">
					<span>
						{numeral(viewCount).format("0.a").toUpperCase()} Views •&nbsp;
						{moment(publishedAt).fromNow()}
					</span>
					<div className="d-flex justify-content-center align-items-center">
						<span className="d-flex justify-content-center align-items-center videoMetaData__top__btn">
							<MdThumbUp size={26} className="mr-1" />
							{numeral(likeCount).format("0.a").toUpperCase()}
						</span>
						<span className="d-flex justify-content-center align-items-center mx-3 videoMetaData__top__btn">
							<MdThumbDown size={26} className="mr-1" /> DisLike
						</span>
						<span
							onClick={copyLink} 
							className="d-flex justify-content-center align-items-center mr-1 videoMetaData__top__btn"
						>
							<span className="videoMetaData__top__copyAlert">Copied!</span>
							<FaShare size="26" className="mr-1" /> Share
						</span>
					</div>
				</div>
			</div>
			<div
				onClick={() => navigate(`/channel/${channelId}`)}
				className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3"
			>
				<div className="d-flex">
					<img
						src={channelSnippet?.thumbnails.default?.url}
						alt="channel Icon"
						className="rounded-circle mr-3"
					/>
					<div className="d-flex flex-column">
						<span>{channelTitle}</span>
						<span>{numeral(channelStatistics?.subscriberCount).format("0.a").toUpperCase()} Subscribers</span>
					</div>
				</div>
				<button className="btn border-0 p-2 m-2">Subscribe</button>
			</div>
			<div className="videoMetaData__description">
				<ShowMoreText
					lines={3}
					more="SHOW MORE"
					less="SHOW LESS"
					anchorClass="showMoreText"
					expanded={false}
				>
					{description}
				</ShowMoreText>	
			</div>
		</div>
	);
} 