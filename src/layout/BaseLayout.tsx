import {Layout} from "antd";
import isArray from "isarray";
import React, {FC, useEffect, useState} from "react";
import {Loader} from "../component/Loader";
import {LayoutContext} from "./LayoutContext";

export interface IBaseLayout {
}

export const BaseLayout: FC<IBaseLayout> = ({children}) => {
	const [fullscreen, setFullscreen] = useState<boolean>(false);
	const [selectMenu, setSelectMenu] = useState<any>([]);
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const [blocking, setBlocking] = useState<number>(0);
	const [data, setData] = useState<any>();
	const isBlocked = () => blocking > 0;
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
				blocking,
				isBlocked,
				block: () => {
					window.scrollTo(0, 0);
					setBlocking(prev => prev + 1);
				},
				unblock: () => {
					setBlocking(prev => prev - 1);
				},
				data,
				setData,
			}}
			children={
				<Loader isLoading={isBlocked()}>
					<Layout children={children}/>
				</Loader>
			}
		/>
	);
};
