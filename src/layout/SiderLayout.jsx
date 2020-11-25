import {Layout, PageHeader} from "antd";
import BaseLayout from "./BaseLayout";
import CollapsibleContent from "./CollapsibleContent";
import Sider from "./Sider";

const SiderLayout = (
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
					<PageHeader/>
					{router}
					{footer}
				</CollapsibleContent>
			</Layout>
		</BaseLayout>
	);
};

export default SiderLayout;
