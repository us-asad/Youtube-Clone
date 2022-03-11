import "./_loader.scss";

export default function Loader() {
	return (
		<div className="loader_main">
			<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
		</div>
	);
}