import {Layout} from "antd";
import {FC, useEffect, useState} from "react";
import {Loader} from "../component/Loader";
import {LayoutContext} from "./LayoutContext";

export interface IBaseLayout {
}

export const BaseLayout: FC<IBaseLayout> = ({children}) => {
	const [fullscreen, setFullscreen] = useState<boolean>(false);
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const [data, setData] = useState<any>();
	return (
		<LayoutContext.Provider
			value={{
				fullscreen,
				useEnableFullscreen: (enable = true, restore = true) => useEffect(() => {
					setFullscreen(enable);
					return () => setFullscreen(!restore);
					// eslint-disable-next-line
				}, []),
				// selectMenu,
				// useMenuSelect: select => useEffect(() => {
				// 	setTimeout(() => setSelectMenu(isArray(select) ? select : [select]), 0);
				// 	// eslint-disable-next-line
				// }, []),
				collapsed,
				setCollapsed,
				data,
				setData,
			}}
			children={
				<Loader isLoading={true}>
					<Layout children={children}/>
				</Loader>
			}
		/>
	);
};
