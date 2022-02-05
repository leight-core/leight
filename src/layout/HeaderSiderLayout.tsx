import {LayoutBlockContextProvider, LayoutContext, LoaderIcon, MenuContextProvider, MenuPlaceholder, PlaceholderPage, useLayoutBlockContext, useLayoutContext, useMenuContext} from "@leight-core/leight";
import {Layout, Spin} from "antd";
import React, {CSSProperties, FC, ReactNode, Suspense, useEffect, useState} from "react";
import {BrowserView, MobileView} from "react-device-detect";

const HeaderSiderLayoutInternal: FC<IHeaderSiderLayoutProps> = ({header, footer, menu, contentStyle, headerStyle, children}) => {
	const menuContext = useMenuContext();
	const layoutContext = useLayoutContext();
	const layoutBlockContext = useLayoutBlockContext();
	return <Layout>
		<Spin indicator={<LoaderIcon/>} spinning={layoutBlockContext.isBlocked()}>
			<BrowserView>
				{header && <Layout.Header style={{backgroundColor: "#fff", padding: 0, ...headerStyle}}>
					{header}
				</Layout.Header>}
				<Layout>
					{layoutContext.fullwidth ? null :
						<Layout.Sider
							theme={"light"}
							collapsible
							onCollapse={menuContext.setCollapse}
							collapsed={menuContext.collapsed}
							width={layoutContext.siderSize}
						>
							{menu || <MenuPlaceholder/>}
						</Layout.Sider>
					}
					<Layout>
						<Layout.Content style={{minHeight: "100vh", padding: "1.5em", ...contentStyle}}>
							<Suspense fallback={<PlaceholderPage/>}>
								{children}
							</Suspense>
							{footer && <Layout.Footer>
								{footer}
							</Layout.Footer>}
						</Layout.Content>
					</Layout>
				</Layout>
			</BrowserView>
			<MobileView>
				<Layout>
					<Layout.Content style={{minHeight: "100vh", ...contentStyle}}>
						<Suspense fallback={<PlaceholderPage/>}>
							{children}
						</Suspense>
						{footer && <Layout.Footer>
							{footer}
						</Layout.Footer>}
					</Layout.Content>
				</Layout>
			</MobileView>
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
	menu?: ReactNode;
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
		menu,
		contentStyle,
		headerStyle,
	}) => {
	const [fullwidth, setFullwidth] = useState<boolean>(false);
	const [siderSize, setSiderSize] = useState<number>(235);
	return <LayoutBlockContextProvider>
		<MenuContextProvider>
			<LayoutContext.Provider
				value={{
					siderSize,
					setSiderSize,
					fullwidth,
					useEnableFullwidth: (enable = true, restore = true) => useEffect(() => {
						setFullwidth(enable);
						return () => setFullwidth(!restore);
					}, []),
				}}
			>
				<HeaderSiderLayoutInternal
					header={header}
					footer={footer}
					menu={menu}
					contentStyle={contentStyle}
					headerStyle={headerStyle}
				>
					{children}
				</HeaderSiderLayoutInternal>
			</LayoutContext.Provider>
		</MenuContextProvider>
	</LayoutBlockContextProvider>;
};
