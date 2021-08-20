import {Drawer, DrawerContextProvider, HeaderPlaceholder, LayoutBlockContextProvider, LayoutContext, LoaderIcon, MenuProvider, PlaceholderPage, useLayoutBlockContext, useLayoutContext, useMenuContext} from "@leight-core/leight";
import {Layout, PageHeader, Spin} from "antd";
import React, {CSSProperties, FC, ReactNode, Suspense, useEffect, useState} from "react";

const HeaderSiderLayoutInternal: FC<IHeaderSiderLayoutProps> = ({header, footer, contentStyle, headerStyle, children}) => {
	const menuContext = useMenuContext();
	const layoutContext = useLayoutContext();
	const layoutBlockContext = useLayoutBlockContext();
	return <Layout>
		<Spin indicator={<LoaderIcon/>} spinning={layoutBlockContext.isBlocked()}>
			<Drawer/>
			<Layout.Header style={{backgroundColor: "#fff", padding: 0, ...headerStyle}}>
				{header}
			</Layout.Header>
			<Layout>
				{layoutContext.fullwidth ? null :
					<Layout.Sider
						theme={"light"}
						collapsible
						onCollapse={menuContext.setCollapse}
						collapsed={menuContext.collapsed}
						width={layoutContext.siderSize}
					>
						{menuContext.menu}
					</Layout.Sider>
				}
				<Layout>
					<Layout.Content style={{minHeight: "100vh", padding: "0em 1.5em", ...contentStyle}}>
						<PageHeader style={{padding: 0}} title={layoutContext.pageHeader}/>
						<Suspense fallback={<PlaceholderPage/>}>
							{children}
						</Suspense>
						<Layout.Footer>
							{footer}
						</Layout.Footer>
					</Layout.Content>
				</Layout>
			</Layout>
		</Spin>
	</Layout>;
};

export interface IHeaderSiderLayoutProps {
	/**
	 * Page (common layout) header.
	 */
	header: ReactNode;
	/**
	 * Page (common layout) footer.
	 */
	footer: ReactNode;
	/**
	 * Optional styling of layout content.
	 */
	contentStyle?: CSSProperties;
	/**
	 * Optional style for the header.
	 */
	headerStyle?: CSSProperties;
}

/**
 * Layout with a common header space, left-sided main menu and content. Packed with some interesting features.
 */
export const HeaderSiderLayout: FC<IHeaderSiderLayoutProps> = (
	{
		header,
		children,
		footer,
		contentStyle,
		headerStyle,
	}) => {
	const [fullwidth, setFullwidth] = useState<boolean>(false);
	const [siderSize, setSiderSize] = useState<number>(240);
	const [pageHeader, setPageHeader] = useState<ReactNode>(<HeaderPlaceholder/>);
	return <LayoutBlockContextProvider>
		<MenuProvider>
			<DrawerContextProvider>
				<LayoutContext.Provider
					value={{
						siderSize,
						setSiderSize,
						fullwidth,
						useEnableFullwidth: (enable = true, restore = true) => useEffect(() => {
							setFullwidth(enable);
							return () => setFullwidth(!restore);
						}, []),
						pageHeader,
						setPageHeader,
					}}
				>
					<HeaderSiderLayoutInternal
						header={header}
						footer={footer}
						contentStyle={contentStyle}
						headerStyle={headerStyle}
					>
						{children}
					</HeaderSiderLayoutInternal>
				</LayoutContext.Provider>
			</DrawerContextProvider>
		</MenuProvider>
	</LayoutBlockContextProvider>;
};
