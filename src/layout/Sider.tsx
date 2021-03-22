import {Layout} from "antd";
import {SiderProps} from "antd/lib/layout";
import React, {FC} from "react";
import {useLayoutContext} from "./LayoutContext";

export interface ISiderProps extends SiderProps {
}

export const Sider: FC<ISiderProps> = (
	{
		children,
		...props
	}) => {
	const layoutContext = useLayoutContext();
	return (
		layoutContext.fullwidth ? null :
			<Layout.Sider
				width={layoutContext.siderSize}
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
