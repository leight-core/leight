import {BlockContextProvider, PageProvider, ScrollToTop, useBlockContext, useLayoutBlockContext, useLayoutContext, useMenuContext} from "@leight-core/leight";
import {Spin} from "antd";
import Head from "next/head";
import {FC, useEffect} from "react";
import {useTranslation} from "react-i18next";

export interface IEmptyPageProps {
	/**
	 * Name (and title) of this page.
	 */
	name: string;
	/**
	 * If provided, page title will be updated (tab name). Must be explicitly provided to change a title.
	 */
	title?: string;
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
	/**
	 * Selected menu items.
	 */
	selected?: string[];
}

const EmptyPageInternal: FC = ({children}) => {
	const {t} = useTranslation();
	const blockContext = useBlockContext();
	return <Spin spinning={blockContext.isBlocked()} indicator={null as any} tip={t("common.loading") as string}>
		{children}
	</Spin>;
};

/**
 * Quite simple empty page without any additional features.
 */
export const EmptyPage: FC<IEmptyPageProps> = (
	{
		name,
		title,
		blocked = false,
		fullwidth = false,
		restore = true,
		selected = [],
		children,
	}) => {
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	const blockContext = useLayoutBlockContext();
	useMenuContext().useSelect(selected);
	layoutContext.useEnableFullwidth(fullwidth, restore);
	useEffect(() => {
		blockContext.unblock(true);
	}, []);
	return <PageProvider>
		{title && <Head><title key={"title"}>{title ? t(title + ".title") : (name ? t(name + ".title") : title)}</title></Head>}
		<ScrollToTop/>
		<BlockContextProvider locked={blocked}>
			<EmptyPageInternal>
				{children}
			</EmptyPageInternal>
		</BlockContextProvider>
	</PageProvider>;
};
