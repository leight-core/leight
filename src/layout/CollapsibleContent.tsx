import {Layout} from "antd";
import React from "react";
import {useLayoutContext} from "./LayoutContext";

export const CollapsibleContent = (
	{
		children,
		...props
	}) => {
	const layoutContext = useLayoutContext();
	return (
		<Layout.Content
			style={{
				minHeight: "100vh",
				marginLeft: layoutContext.fullscreen ? 0 : (layoutContext.collapsed ? 80 : 220),
			}}
			children={children}
			{...props}
		/>
	);
};
