import {Layout, PageHeader} from "antd";
import {FC, Suspense} from "react";
import {PlaceholderView} from "../view/PlaceholderView";
import {BaseLayout} from "./BaseLayout";
import {CollapsibleContent} from "./CollapsibleContent";
import {useLayoutContext} from "./LayoutContext";
import {Sider} from "./Sider";

const SiderLayoutInternal = ({header, router, footer}) => {
	const {menuContext} = useLayoutContext();
	return (
		<>
			{header}
			<Layout style={{
				minHeight: "100vh",
				padding: "0 50px",
				marginTop: 64
			}}>
				<Sider children={menuContext.menu}/>
				<CollapsibleContent>
					<PageHeader title={""}/>
					<Suspense fallback={<PlaceholderView/>}>
						{router}
					</Suspense>
					{footer}
				</CollapsibleContent>
			</Layout>
		</>
	);
};

export interface ISiderLayout {
	/**
	 * Page (common layout) header.
	 */
	header: JSX.Element
	/**
	 * Application routing (all modules).
	 */
	router: JSX.Element
	/**
	 * Page (common layout) footer.
	 */
	footer: JSX.Element
	/**
	 * Default menu.
	 */
	defaultMenu: JSX.Element
}

export const SiderLayout: FC<ISiderLayout> = (
	{
		header,
		defaultMenu,
		router,
		footer,
	}) => {
	return (
		<BaseLayout defaultMenu={defaultMenu}>
			<SiderLayoutInternal
				header={header}
				router={router}
				footer={footer}
			/>
		</BaseLayout>
	);
};
