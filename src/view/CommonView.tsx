import {Spin} from "antd";
import {FC, ReactNode, useState} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {useBlockContext} from "../block/BlockContext";
import {BlockContextProvider} from "../block/BlockContextProvider";
import {ScrollToTop} from "../component/ScrollToTop";
import {useLayoutContext} from "../layout/LayoutContext";
import {UpdatePageHeader} from "../layout/UpdatePageHeader";
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
	menu: () => ReactNode
	/**
	 * Name of used menu; used to prevent redraws.
	 */
	menuName?: string
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
	fullwidth?: boolean
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
	/**
	 * When provided, page header will be updated.
	 */
	pageHeader?: ReactNode
}

const CommonViewInternal = ({children}) => {
	const {t} = useTranslation();
	const [title, setTitle] = useState<ReactNode>();
	const blockContext = useBlockContext();
	return (
		<ViewContext.Provider value={{blockContext, title, setTitle}}>
			<Spin spinning={blockContext.isBlocked()} indicator={null as any} tip={t("common.loading") as string}>
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
		menuName,
		menuItems = undefined,
		fullwidth = false,
		restore = true,
		children,
		blocked = false,
		pageHeader,
	}) => {
	const {t} = useTranslation();
	const menuContext = useMenuContext();
	const layoutContext = useLayoutContext();
	menuContext.useMenu(menu(), menuName);
	menuContext.useSelect(menuItems || [name]);
	layoutContext.useEnableFullwidth(fullwidth, restore);
	return (
		<>
			<Helmet title={t(title ? title : name + ".title")}/>
			{pageHeader && <UpdatePageHeader children={pageHeader}/>}
			<BlockContextProvider locked={blocked}>
				<CommonViewInternal children={children}/>
			</BlockContextProvider>
		</>
	);
};
