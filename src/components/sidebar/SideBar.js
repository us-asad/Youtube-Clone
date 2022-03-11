import "./_sidebar.scss";
import {
   MdSubscriptions,
   MdExitToApp,
   MdThumbUp,
   MdHistory,
   MdLibraryBooks,
   MdHome,
   MdSentimentDissatisfied
} from 'react-icons/md';

export default function Sidebar({sidebar,handleSetToggleSidebar}) {
	return (
		<nav className={sidebar ? "sidebar open" : "sidebar"}
			onClick={handleSetToggleSidebar}
		>
			<li>
				<MdHome size={23} />
				<span>Home</span>
			</li>
			<li>
				<MdSubscriptions size={23} />
				<span>Subscriptons</span>
			</li>
			<li>
				<MdThumbUp size={23} />
				<span>Liked Videos</span>
			</li>
			<li>
				<MdHistory size={23} />
				<span>History</span>
			</li>
			<li>
				<MdLibraryBooks size={23} />
				<span>Library</span>
			</li>
			<li>
				<MdSentimentDissatisfied size={23} />
				<span>I Don`t Know</span>
			</li>
			<hr />
			<li>
				<MdExitToApp size={23} />
				<span>Log Out</span>
			</li>
			<hr />
		</nav>
	);
}