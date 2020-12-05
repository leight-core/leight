import {Spin} from "antd";
import {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {ScrollToTop} from "../component/ScrollToTop";
import {IMenuSelector, useLayoutContext} from "../layout/LayoutContext";
import {ViewContext} from "./ViewContext";

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
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	const [blocking, setBlocking] = useState<number>(0);
	layoutContext.useMenuSelect(menu ? menu : [name]);
	layoutContext.useEnableFullscreen(fullscreen, restore);
	useAppContext().useTitle(title ? title : name + ".title");
	const isBlocked = () => blocking > 0;
	return (
		<ViewContext.Provider value={{
			blocking,
			isBlocked,
			block: () => setBlocking(prev => prev + 1),
			unblock: () => setBlocking(prev => prev - 1),
		}}>
			<Spin delay={200} spinning={isBlocked()} tip={t("common.loading")}>
				<ScrollToTop/>
				{children}
			</Spin>
		</ViewContext.Provider>
	);
};
