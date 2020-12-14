import {Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";
import {ButtonLink} from "../component/ButtonLink";
import {ScrollToTop} from "../component/ScrollToTop";
import {HomeIcon} from "../icon/HomeIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {link} from "../router/index";

export interface INotFoundViewProps {
	/**
	 * Link ID used to redirect on "not found". Internally uses {@see link}.
	 */
	href: string
}

/**
 * Simple 4o4 view.
 */
export const NotFoundView: FC<INotFoundViewProps> = ({href}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	useAppContext().useTitle("error.not-found.title");
	return (
		<>
			<ScrollToTop/>
			<Result
				status="404"
				title={t("error.not-found.title")}
				subTitle={t("error.not-found.body")}
				extra={
					<ButtonLink href={href} icon={<HomeIcon/>} title={"common.homepage"}/>
				}
			/>
		</>
	);
};
