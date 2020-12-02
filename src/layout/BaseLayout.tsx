import {Layout} from "antd";
import isArray from "isarray";
import React, {useEffect, useState} from "react";
import {Loader} from "../component/Loader";
import {LayoutContext} from "./LayoutContext";

export const BaseLayout = ({children}) => {
	const [fullscreen, setFullscreen] = useState<boolean>(false);
	const [selectMenu, setSelectMenu] = useState<any>([]);
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const [loading, setLoading] = useState<number>(0);
	const [data, setData] = useState<any>();
	const isLoading = () => loading > 0;
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
				useMenuSelect: select => useEffect(() => {
					setTimeout(() => setSelectMenu(isArray(select) ? select : [select]), 0);
					// eslint-disable-next-line
				}, []),
				collapsed,
				setCollapsed,
				loading,
				isLoading,
				loadingStart: () => {
					window.scrollTo(0, 0);
					setLoading(prev => prev + 1);
				},
				loadingFinish: () => {
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
