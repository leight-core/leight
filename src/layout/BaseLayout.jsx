import { Layout } from "antd";
import isArray from "isarray";
import {
	useEffect,
	useState
} from "react";
import Loader from "../component/Loader";
import { LayoutContext } from "./LayoutContext";

const BaseLayout = ({children}) => {
	const [fullscreen, setFullscreen] = useState(false);
	const [selectMenu, setSelectMenu] = useState([]);
	const [collapsed, setCollapsed]   = useState(false);
	const [loading, setLoading]       = useState(0);
	const [data, setData]             = useState({});
	const isLoading                   = () => loading > 0;
	return (
		<LayoutContext.Provider
			value={{
				fullscreen,
				useEnableFullscreen: (enable = true, restore = true) => useEffect(() => {
					setFullscreen(enable);
					return () => setFullscreen(!restore);
					// eslint-disable-next-line
				}, []),
				selectMenu,
				useMenuSelect:       select => useEffect(() => {
					setTimeout(() => setSelectMenu(isArray(select) ? select : [select]), 0);
					// eslint-disable-next-line
				}, []),
				collapsed,
				setCollapsed,
				loading,
				isLoading,
				loadingStart:        () => {
					window.scrollTo(0, 0);
					setLoading(prev => prev + 1);
				},
				loadingFinish:       () => {
					setLoading(prev => prev - 1);
				},
				data,
				setData,
			}}
			children={
				<Loader isLoading={isLoading()}>
					<Layout children={children}/>
				</Loader>
			}
		/>
	);
};

export default BaseLayout;
