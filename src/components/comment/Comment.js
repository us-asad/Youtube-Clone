import moment from "moment";
import "./_comment.scss";

export default function Comment({comment}) {
	const {textDisplay,authorDisplayName,authorProfileImageUrl,publishedAt} = comment;	

	return (
		<div className="comment p-2 d-flex">
			<img
				src={authorProfileImageUrl}
				alt="you"
				className="rounded-circle mr-3"
			/>
			<div className="comment__body">
				<p className="comment__header mb-1">
          			{authorDisplayName} •&nbsp;
          			{moment(publishedAt).fromNow()}
				</p>
				<p dangerouslySetInnerHTML={{ __html: textDisplay }} />
			</div>
		</div>
	);
}