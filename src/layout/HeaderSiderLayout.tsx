import {LayoutContext, LoaderIcon, MenuPlaceholder, PlaceholderPage, useLayoutBlockContext, useLayoutContext, useMenuCollapseContext} from "@leight-core/leight";
import {Layout, Spin} from "antd";
import React, {CSSProperties, FC, ReactNode, Suspense, useEffect, useState} from "react";
import {BrowserView, MobileView} from "react-device-detect";

interface ILayoutSiderProps {
	menu?: ReactNode;
}

const LayoutSider: FC<ILayoutSiderProps> = ({menu}) => {
	const menuCollapseContext = useMenuCollapseContext();
	const layoutContext = useLayoutContext();
	return <Layout.Sider
		hidden={layoutContext.fullwidth}
		theme={"light"}
		collapsible
		onCollapse={menuCollapseContext.setCollapsed}
		collapsed={menuCollapseContext.collapsed}
		width={layoutContext.siderSize}
	>
		<MenuPlaceholder menu={menu}/>
	</Layout.Sider>;
};

const HeaderSiderLayoutInternal: FC<IHeaderSiderLayoutProps> = ({header, footer, menu, contentStyle, headerStyle, children}) => {
	const layoutBlockContext = useLayoutBlockContext();
	return <Layout>
		<Spin indicator={<LoaderIcon/>} spinning={layoutBlockContext.isBlocked()}>
			<BrowserView>
				{header && <Layout.Header style={{backgroundColor: "#fff", padding: 0, ...headerStyle}}>
					{header}
				</Layout.Header>}
				<Layout>
					<LayoutSider menu={menu}/>
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
export const HeaderSiderLayout: FC<IHeaderSiderLayoutProps> = props => {
	const [fullwidth, setFullwidth] = useState<boolean>(false);
	const [siderSize, setSiderSize] = useState<number>(235);
	return <LayoutContext.Provider
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
		<HeaderSiderLayoutInternal {...props}/>
	</LayoutContext.Provider>;
};
