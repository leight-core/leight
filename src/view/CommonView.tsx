import {Spin} from "antd";
import {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {Block} from "../block/Block";
import {useBlockContext} from "../block/BlockContext";
import {ScrollToTop} from "../component/ScrollToTop";
import {useLayoutContext} from "../layout/LayoutContext";
import {useMenuContext} from "../menu/MenuContext";
import {ViewContext} from "./ViewContext";

export interface ICommonViewProps {
	/**
	 * Name of this view; it's also used for menu selection and title.
	 */
	name: string
	/**
	 * If generated title is not enough, it could be overridden.
	 */
	title?: string
	/**
	 * Menu for this view.
	 */
	menu: JSX.Element
	/**
	 * Currently selected menu items (if any).
	 */
	menuItems?: string[]
	fullscreen?: boolean
	restore?: boolean
	blocked?: boolean
}

const CommonViewInternal = ({children}) => {
	const {t} = useTranslation();
	const blockContext = useBlockContext();
	return (
		<ViewContext.Provider value={{blockContext}}>
			<Spin spinning={blockContext.isBlocked()} tip={t("common.loading") as string}>
				<ScrollToTop/>
				{children}
			</Spin>
		</ViewContext.Provider>
	);
};

export const CommonView: FC<ICommonViewProps> = (
	{
		name,
		title,
		menu,
		menuItems = undefined,
		fullscreen = false,
		restore = true,
		children,
		blocked = false,
	}) => {
	const menuContext = useMenuContext();
	useLayoutContext().useEnableFullscreen(fullscreen, restore);
	useAppContext().useTitle(title ? title : name + ".title");
	menuContext.useMenu(menu);
	menuContext.useSelect(menuItems || [name]);
	return (
		<Block locked={blocked}>
			<CommonViewInternal children={children}/>
		</Block>
	);
};
