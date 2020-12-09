import {Layout, PageHeader} from "antd";
import {FC, Suspense} from "react";
import {useMenuContext} from "../menu/MenuContext";
import {PlaceholderView} from "../view/PlaceholderView";
import {BaseLayout} from "./BaseLayout";
import {CollapsibleContent} from "./CollapsibleContent";
import {Sider} from "./Sider";

const SiderLayoutInternal = ({header, menu, router, footer}) => {
	const menuContext = useMenuContext();
	menuContext.useMenu(menu);
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
	menu: JSX.Element
}

export const SiderLayout: FC<ISiderLayout> = (
	{
		header,
		menu,
		router,
		footer,
	}) => {
	return (
		<BaseLayout>
			<SiderLayoutInternal
				header={header}
				menu={menu}
				router={router}
				footer={footer}
			/>
		</BaseLayout>
	);
};
