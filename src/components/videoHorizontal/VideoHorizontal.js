import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../api";
import {AiFillEye} from "react-icons/ai";
import {Row,Col} from "react-bootstrap";
import classNames from "classnames";
import "./_videoHorizontal.scss";

export default function VideoHorizontal({video,searchScreen}) {
	const [views,setViews] = useState(null);
	const [duration,setDuration] = useState(null);
	const [channelIcon,setChannelIcon] = useState(null);
	
	const navigate = useNavigate();
		
	const {
		id,
		snippet: {
			channelId,
			channelTitle,
			description,
			title,
			publishedAt,
			thumbnails
		}
	} = video;
	const isVideo = id.kind === "youtube#video";


	useEffect(() => {
		const getVideoDetails = async () => {
			const {data: {items}} = await request("/videos",{
				params: {
					part: "contentDetails,statistics",
					id: id.videoId
				}
			});

			setDuration(items[0].contentDetails.duration);
			setViews(items[0].statistics.viewCount);
		}

		getVideoDetails();
	},[id]);

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

	const seconds = moment.duration(duration).asSeconds();
	const _duration = moment.utc(seconds * 1000).format("mm:ss");

	const thumbnail = !isVideo && "videoHorizontal__thumbnail-channel"; 

	function handleClick() {
		if (isVideo) {
			navigate(`/watch/${id.videoId}`);
		} else {
			navigate(`/channel/${channelId}`);			
		}
	}

	let channelBtnClasses = classNames("videoHorizontal__channel d-flex align-items-center my-1",{
		"my-3": searchScreen
	})

	return (
		<Row className="videoHorizontal m-1 py-2 align-items-center" onClick={handleClick}>
			<Col xs={12} md={searchScreen ? 4 : 6} className="videoHorizontal__left">
				<LazyLoadImage
					src={thumbnails.medium.url}
					effect="blur"
					className={`videoHorizontal__thumbnail ${thumbnail}`}
					wrapperClassName="videoHorizontal__thumbnail-wrapper"
				/>
				{isVideo && <span className="videoHorizontal__duration">{_duration}</span>}
			</Col>
			<Col xs={12} md={searchScreen ? 8 : 6} className="videoHorizontal__right pt-3 pt-md-0 px-0">
				<p 
					dangerouslySetInnerHTML={{ __html: title }}
				 	className="videoHorizontal__title mb-1 text-white fw-bold" />
				{isVideo && (
					<div className="videoHorizontal__details">
						<AiFillEye />&nbsp;
						{numeral(views).format("0.a").toUpperCase()} Views •&nbsp;
						{moment(publishedAt).fromNow()}
					</div>
				)}

				<div className={channelBtnClasses}>
					{isVideo && searchScreen ? (<LazyLoadImage
						src={channelIcon?.url}
						effect="blur"
					/>) : null}
					<p className="mb-0">{channelTitle}</p>
				</div>

				{searchScreen && <p style={{display: window.innerWidth < 768 ? "none" : "block"}} className="mt-1">{description}</p>}
			</Col>
		</Row>
	);
}