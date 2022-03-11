import {useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {fetchVideosByCategory} from "../../redux/slices/videosSlice";
import "./_categoriesBar.scss";

const keywords = [
   'All',
   'React js',
   'Angular js',
   'React Native',
   'use of API',
   'Redux',
   'Music',
   'Algorithm Art',
   'Money',
   'Relax Songs',
   'Coding',
   'Trevel',
   'Football',
   'Tennis',
   'Hip Hop',
   'Poor Coder',
   'Programming',
];

export default function CategoriesBar() {
	const [activeElement,setActiveElement] = useState("All");
   const {nextPageToken} = useSelector(state => state.homeVideos);
   const dispatch = useDispatch();

	const handleSetActiveElement = value => {
      setActiveElement(value);
      dispatch(fetchVideosByCategory(value,nextPageToken));
   }

	return (
		<div className="categoriesBar">
			{keywords.map(value => (
				<span 
					onClick={() => handleSetActiveElement(value)}
					className={activeElement === value ? "active" : ""}
					key={value}
				>
					{value}
				</span>
			))}
		</div>
	);
}