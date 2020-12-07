import {Spin} from "antd";
import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {ScrollToTop} from "../component/ScrollToTop";
import {IMenuSelector, useLayoutContext} from "../layout/LayoutContext";
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
	menu?: IMenuSelector,
	fullscreen?: boolean
	restore?: boolean
	/**
	 * Should be a view blocked by default? This flag is reset by any call to unblock().
	 */
	blocked?: boolean
}

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
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	const [isBlocked, setIsBlocked] = useState<boolean>(blocked);
	const [blocking, setBlocking] = useState<number>(0);
	layoutContext.useMenuSelect(menu ? menu : [name]);
	layoutContext.useEnableFullscreen(fullscreen, restore);
	useAppContext().useTitle(title ? title : name + ".title");
	const isBlocking = () => blocking > 0 || isBlocked;
	return (
		<ViewContext.Provider value={{
			blocking,
			isBlocked: isBlocking,
			block: () => setBlocking(prev => prev + 1),
			unblock: () => {
				isBlocked && setIsBlocked(false);
				setBlocking(prev => prev - 1);
			},
			blocked: (blocked = true) => setIsBlocked(blocked)
		}}>
			<Spin spinning={isBlocking()} tip={t("common.loading")}>
				<ScrollToTop/>
				{children}
			</Spin>
		</ViewContext.Provider>
	);
};
