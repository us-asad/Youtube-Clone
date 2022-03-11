import {useState} from "react";
import {Container} from "react-bootstrap";
import {Route,Routes,Navigate} from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import SearchScreen from "./screens/SearchScreen";
import "./_app.scss";

function Layout({children}) {
	const [sidebar,setToggleSidebar] = useState(false);

	const handleSetToggleSidebar = () => setToggleSidebar(value => !value);

	return (
		<>
			<Header handleSetToggleSidebar={handleSetToggleSidebar} />
			<div className="app__container">
				<SideBar
					handleSetToggleSidebar={handleSetToggleSidebar}
					sidebar={sidebar}
				/>
				<Container fluid className="app_main">
					{children}
				</Container>
			</div>
		</>	
	);
}


export default function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={
					<Layout>
						<HomeScreen />
					</Layout>
				} />
				<Route path="/watch/:id" element={
					<Layout>
						<WatchScreen />
					</Layout>
				} />
				<Route path="/search/:query" element={
					<Layout>
						<SearchScreen />
					</Layout>
				} />
				<Route path="/channel/:channelId" element={
					<Layout>
						<ChannelScreen />
					</Layout>
				} />
				<Route
			        path="*"
			        element={<Navigate to="/" />}
			    />
			</Routes>
		</>
	)
}