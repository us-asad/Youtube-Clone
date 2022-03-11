import {Helmet} from "react-helmet";

export default function HelmetCustom({
	title = "YouTube",
	description = "YouTube Clone! usmonovasad89@gmail.com <=> developer:)"
}) {
	return (
		<Helmet>
			<title>{`${title}`}</title>
			<meta name="description" content={`${description}`} />
			<meta property="og:locale" content="en_US" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={`${title}`} />
			<meta property="og:description" content={`${description}`} />
		</Helmet>
	);
}