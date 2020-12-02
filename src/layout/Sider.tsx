import {Layout} from "antd";
import React from "react";
import {useLayoutContext} from "./LayoutContext";

export const Sider = (
	{
		children,
		...props
	}) => {
	const layoutContext = useLayoutContext();
	return (
		layoutContext.fullscreen ? null :
			<Layout.Sider
				collapsible
				collapsed={layoutContext.collapsed}
				defaultCollapsed={layoutContext.collapsed}
				onCollapse={layoutContext.setCollapsed}
				width={220}
				style={{
					overflow: "auto",
					height: "100vh",
					position: "fixed",
					backgroundColor: "rgb(240, 242, 245)",
					left: 0,
				}}
				children={children}
				{...props}
			/>
	);
};
