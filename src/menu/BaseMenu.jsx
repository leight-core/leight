import { Menu } from "antd";
import { useLayoutContext } from "../layout/LayoutContext";

const BaseMenu = ({children}) => {
	const layoutContext = useLayoutContext();
	if (!layoutContext) {
		throw new Error("Base menu must be used under LayoutContext (use for example BaseLayout component).");
	}
	return (
		<Menu
			mode="inline"
			selectable={true}
			selectedKeys={layoutContext.selectMenu}
			style={{height: "100vh"}}
			children={children}
		/>
	);
};

export default BaseMenu;
