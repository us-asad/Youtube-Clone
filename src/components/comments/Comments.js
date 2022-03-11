import {useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchComments} from "../../redux/slices/commentsSlice";
import Comment from "../comment/Comment";
import logo from "../../utils/logo.jpg";
import "./_comments.scss";

export default function Comments({videoId,commentsCount}) {
	const [commentText,setCommentText] = useState("");

	const dispatch = useDispatch();
	const {comments} = useSelector(state => state.commentsList);

	const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet);

	useEffect(() => {
		dispatch(fetchComments(videoId));
	},[videoId, dispatch]);


	function handleComment(e) {
		e.preventDefault();
	}

	return (
		<div className="comments">
			<p>{commentsCount} Comments</p>
			<div className="comment__form d-flex w-100 my-2">
				<img
					src={logo}
					alt="you"
					className="rounded-circle mr-3"
				/>
				<form onSubmit={e => handleComment(e)} className="d-flex flex-grow-1">
					<input
						type="text"
						placeholder="Leave a comment..."
						className="flex-grow-1"
						onChange={e => setCommentText(e.target.value)}
						value={commentText}
					/>
					<button className="border-0 p-2">Comment</button>
				</form>
			</div>
			<div className="comments__list">
				{_comments.map((comment,i) => (
					<Comment key={i} comment={comment} />
				))}
			</div>
		</div>
	);
}