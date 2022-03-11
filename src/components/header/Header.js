import {useState} from "react";
import {useNavigate,useParams,Link} from "react-router-dom";
import "./_header.scss";
import {FaBars} from "react-icons/fa";
import {AiOutlineSearch} from "react-icons/ai";
import {MdNotifications,MdApps} from "react-icons/md";
import logo from "../../utils/logo.jpg"

export default function Header({handleSetToggleSidebar}) {
	const {query} = useParams();
	const navigate = useNavigate();

	const [searchText,setSearchText] = useState(query);

	function handleSearch(e) {
		e.preventDefault();

		navigate(`/search/${searchText}`);
	}

	return (
		<div className="border border-dark header">
			
			<FaBars className="header__menu"
				onClick={handleSetToggleSidebar}
			size={26} />
			<Link to="/">
				<img src="http://pngimg.com/uploads/youtube/youtube_PNG2.png" alt="You Tube" className="header__logo" />
			</Link>
			<form onSubmit={e => handleSearch(e)}>
				<input
					type="text"
					placeholder="Search"
					onChange={e => setSearchText(e.target.value)}
					value={searchText}
				/>
				<button type="submit">
					<AiOutlineSearch size={22} />
				</button>
			</form>
			<div className="header__icons">
				<MdNotifications size={28} />
				<MdApps size={28} />
				<img src={logo} alt="NoOne" title="NoOne" />
			</div>
		</div>
	);
}