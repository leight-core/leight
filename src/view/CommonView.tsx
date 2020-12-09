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

export interface ICommonView {
	/**
	 * Name of this view; it's also used for menu selection and title.
	 */
	name: string
	/**
	 * If generated title is not enough, it could be overridden.
	 */
	title?: string
	/**
	 * If a menu is used, this marks current view in the menu.
	 */
	menu?: string[],
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

export const CommonView: FC<ICommonView> = (
	{
		name,
		title,
		menu,
		fullscreen = false,
		restore = true,
		children,
		blocked = false,
	}) => {
	useLayoutContext().useEnableFullscreen(fullscreen, restore);
	useAppContext().useTitle(title ? title : name + ".title");
	useMenuContext().useSelect(menu ? menu : [name]);
	return (
		<Block locked={blocked}>
			<CommonViewInternal children={children}/>
		</Block>
	);
};
