import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export default function SkeletonVideo() {
	return (
		<div>
			<SkeletonTheme color="#343a40" highlightColor="#404850">
				<Skeleton height={100} />
				<div>
					<Skeleton style={{margin: ".5rem"}} circle height={40} width={40} />
					<Skeleton height={40} width="75%" />
				</div>
			</SkeletonTheme>
		</div>
	);
}