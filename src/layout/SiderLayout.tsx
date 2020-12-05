import {Layout, PageHeader} from "antd";
import {Suspense} from "react";
import {PlaceholderView} from "../view/PlaceholderView";
import {BaseLayout} from "./BaseLayout";
import {CollapsibleContent} from "./CollapsibleContent";
import {Sider} from "./Sider";

export const SiderLayout = (
	{
		header,
		menu,
		router,
		footer,
	}) => {
	return (
		<BaseLayout>
			{header}
			<Layout style={{
				minHeight: "100vh",
				padding: "0 50px",
				marginTop: 64
			}}>
				<Sider children={menu}/>
				<CollapsibleContent>
					<PageHeader title={""}/>
					<Suspense fallback={<PlaceholderView/>}>
						{router}
					</Suspense>
					{footer}
				</CollapsibleContent>
			</Layout>
		</BaseLayout>
	);
};
