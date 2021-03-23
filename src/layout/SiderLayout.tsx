import {Layout, PageHeader} from "antd";
import React, {FC, Suspense} from "react";
import {PlaceholderView} from "../view/PlaceholderView";
import {BaseLayout} from "./BaseLayout";
import {useLayoutContext} from "./LayoutContext";
import {Sider} from "./Sider";

const SiderLayoutInternal = ({header, footer, children}) => {
	const {menuContext} = useLayoutContext();
	const layoutContext = useLayoutContext();
	return (
		<>
			{header}
			<Layout style={{
				minHeight: "100vh",
				padding: "0 50px",
				marginTop: 64
			}}>
				<Sider children={menuContext.menu}/>
				<Layout.Content
					style={{
						minHeight: "100vh",
						marginLeft: layoutContext.fullwidth ? 0 : layoutContext.siderSize,
					}}>
					<PageHeader style={{padding: 0}} title={layoutContext.header}/>
					<Suspense fallback={<PlaceholderView/>} children={children}/>
					{footer}
				</Layout.Content>
			</Layout>
		</>
	);
};

export interface ISiderLayoutProps {
	/**
	 * Page (common layout) header.
	 */
	header: JSX.Element
	/**
	 * Page (common layout) footer.
	 */
	footer: JSX.Element
}

export const SiderLayout: FC<ISiderLayoutProps> = (
	{
		header,
		children,
		footer,
	}) => {
	return (
		<BaseLayout>
			<SiderLayoutInternal
				header={header}
				footer={footer}
				children={children}
			/>
		</BaseLayout>
	);
};
