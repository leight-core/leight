import {Spin} from "antd";
import {FC, ReactNode, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {useAppContext} from "../app/AppContext";
import {Block} from "../block/Block";
import {useBlockContext} from "../block/BlockContext";
import {ScrollToTop} from "../component/ScrollToTop";
import {useLayoutContext} from "../layout/LayoutContext";
import {useMenuContext} from "../menu/MenuContext";
import {useRouterContext} from "../router/RouterContext";
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
	menu: () => ReactNode
	/**
	 * Currently selected menu items (if any).
	 */
	menuItems?: string[]
	/**
	 * Is the given view in a "fullscreen" mode - means menu is disabled, page header
	 * is displayed.
	 *
	 * Defaults to `false`.
	 */
	fullscreen?: boolean
	/**
	 * Restore the original fullscreen mode when a view is left.
	 *
	 * Defaults to `true`.
	 */
	restore?: boolean
	/**
	 * Initial blocking state of a view; when true, view shows a loader.
	 *
	 * Defaults to `false`.
	 */
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

/**
 * Common view does a lot of things and it should be used **once** as a top level view component.
 *
 * There is no styling or other things used, so it's ideal for building view from scratch.
 */
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
	const layoutContext = useLayoutContext();
	useRouterContext().setParams(useParams());
	useAppContext().useTitle(title ? title : name + ".title");
	menuContext.useMenu(menu());
	menuContext.useSelect(menuItems || [name]);
	layoutContext.useEnableFullscreen(fullscreen, restore);
	useEffect(() => layoutContext.setData({}), []);
	return (
		<Block locked={blocked}>
			<CommonViewInternal children={children}/>
		</Block>
	);
};
