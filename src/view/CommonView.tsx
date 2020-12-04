import {FC} from "react";
import {useAppContext} from "../app/AppContext";
import {ScrollToTop} from "../component/ScrollToTop";
import {IMenuSelector, useLayoutContext} from "../layout/LayoutContext";

export interface ICommonView {
	name: string
	title?: string
	menu?: IMenuSelector,
	fullscreen?: boolean
	restore?: boolean
}

export const CommonView: FC<ICommonView> = (
	{
		name,
		title,
		menu,
		fullscreen = false,
		restore = true,
		children,
	}) => {
	const layoutContext = useLayoutContext();
	layoutContext.useMenuSelect(menu ? menu : [name + ".menu"]);
	layoutContext.useEnableFullscreen(fullscreen, restore);
	useAppContext().useTitle(title ? title : name + ".title");
	return (
		<>
			<ScrollToTop/>
			{children}
		</>
	);
};
