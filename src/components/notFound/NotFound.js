import "./notFound.scss";

export default function NotFound({query}) {
	return (
		<div className="notFound">
			<h2>Noting Found For <i>{query}</i></h2>
		</div>
	);
}