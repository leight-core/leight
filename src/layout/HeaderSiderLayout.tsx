import {Layout, PageHeader, Spin} from "antd";
import React, {CSSProperties, FC, ReactNode, Suspense, useEffect, useState} from "react";
import {useBlockContext} from "../block/BlockContext";
import {BlockContextProvider} from "../block/BlockContextProvider";
import {Drawer} from "../drawer/Drawer";
import {DrawerContextProvider} from "../drawer/DrawerContextProvider";
import {useMenuContext} from "../menu/MenuContext";
import {PlaceholderView} from "../view/PlaceholderView";
import {HeaderPlaceholder} from "./HeaderPlaceholder";
import {LayoutContext, useLayoutContext} from "./LayoutContext";

const HeaderSiderLayoutInternal = ({header, footer, contentStyle, headerStyle, children}) => {
	const menuContext = useMenuContext();
	const layoutContext = useLayoutContext();
	const blockContext = useBlockContext();
	return (
		<Layout>
			<Spin spinning={blockContext.isBlocked()}>
				<Drawer/>
				<Layout.Header style={...{...{backgroundColor: "#fff", padding: 0}, ...headerStyle}} children={header}/>
				<Layout>
					{layoutContext.fullwidth ? null :
						<Layout.Sider
							theme={"light"}
							collapsible
							width={layoutContext.siderSize}
							children={menuContext.menu}
						/>}
					<Layout>
						<Layout.Content style={...{...{minHeight: "100vh", padding: "0em 1.5em"}, ...contentStyle}}>
							<PageHeader style={{padding: 0}} title={layoutContext.pageHeader}/>
							<Suspense fallback={<PlaceholderView/>} children={children}/>
							<Layout.Footer children={footer}/>
						</Layout.Content>
					</Layout>
				</Layout>
			</Spin>
		</Layout>
	);
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
	return (
		<BlockContextProvider>
			<DrawerContextProvider>
				<LayoutContext.Provider
					value={{
						siderSize,
						setSiderSize,
						fullwidth,
						useEnableFullwidth: (enable = true, restore = true) => useEffect(() => {
							setFullwidth(enable);
							return () => setFullwidth(!restore);
							// eslint-disable-next-line
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
						children={children}
					/>
				</LayoutContext.Provider>
			</DrawerContextProvider>
		</BlockContextProvider>
	);
};
