import {Spin} from "antd";
import Head from "next/head";
import {FC, ReactNode} from "react";
import {useTranslation} from "react-i18next";
import {useBlockContext} from "../block/BlockContext";
import {BlockContextProvider} from "../block/BlockContextProvider";
import {ScrollToTop} from "../component/ScrollToTop";
import {useLayoutBlockContext} from "../layout/LayoutBlockContext";
import {useLayoutContext} from "../layout/LayoutContext";
import {UpdatePageHeader} from "../layout/UpdatePageHeader";
import {useMenuContext} from "../menu/MenuContext";

export interface IEmptyPageProps {
	/**
	 * Name of this page; it's also used for menu selection.
	 */
	name: string;
	/**
	 * Optional header (if used, UpdateHeader component will be executed).
	 */
	header?: ReactNode;
	/**
	 * If provided, page title will be updated (tab name). Must be explicitly provided to change a title.
	 */
	title?: string;
	/**
	 * Menu for this view.
	 */
	menu?: () => JSX.Element;
	/**
	 * Currently selected menu items (if any).
	 */
	menuItems?: string[];
	/**
	 * Is the given view in a "fullscreen" mode - means menu is disabled, page header
	 * is displayed.
	 *
	 * Defaults to `false`.
	 */
	fullwidth?: boolean;
	/**
	 * Restore the original fullscreen mode when a view is left.
	 *
	 * Defaults to `true`.
	 */
	restore?: boolean;
	/**
	 * Initial blocking state of a view; when true, view shows a loader.
	 *
	 * Defaults to `false`.
	 */
	blocked?: boolean;
}

const EmptyPageInternal = ({children}) => {
	const {t} = useTranslation();
	const blockContext = useBlockContext();
	return <>
		<Spin spinning={blockContext.isBlocked()} indicator={null as any} tip={t("common.loading") as string}>
			{children}
		</Spin>
	</>;
};

/**
 * Quite simple empty page without any additional features.
 */
export const EmptyPage: FC<IEmptyPageProps> = (
	{
		name,
		menu,
		menuItems,
		header,
		title,
		blocked = false,
		fullwidth = false,
		restore = true,
		children,
	}) => {
	const {t} = useTranslation();
	const menuContext = useMenuContext();
	const layoutContext = useLayoutContext();
	const blockContext = useLayoutBlockContext();
	menuContext.useMenu(menu ? menu() : undefined, name);
	menuContext.useSelect(menuItems || [name]);
	layoutContext.useEnableFullwidth(fullwidth, restore);
	blockContext.unblock(true);
	return <>
		{header && <UpdatePageHeader>
			{header}
		</UpdatePageHeader>}
		{title && <Head><title key={"title"}>{title ? t(title + ".title") : (name ? t(name + ".title") : title)}</title></Head>}
		<ScrollToTop/>
		<BlockContextProvider locked={blocked}>
			<EmptyPageInternal>
				{children}
			</EmptyPageInternal>
		</BlockContextProvider>
	</>;
};
