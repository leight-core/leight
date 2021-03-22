import {Layout} from "antd";
import {LayoutContextProps} from "antd/lib/layout/layout";
import React, {FC} from "react";
import {useLayoutContext} from "./LayoutContext";

export interface ICollapsibleContentProps extends Partial<LayoutContextProps> {
}

export const CollapsibleContent: FC<ICollapsibleContentProps> = (
	{
		children,
		...props
	}) => {
	const layoutContext = useLayoutContext();
	return (
		<Layout.Content
			style={{
				minHeight: "100vh",
				marginLeft: layoutContext.fullwidth ? 0 : 220,
			}}
			children={children}
			{...props}
		/>
	);
};
