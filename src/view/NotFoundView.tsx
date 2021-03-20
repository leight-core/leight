import {Result} from "antd";
import React, {FC} from "react";
import {Helmet} from "react-helmet";
import {useTranslation} from "react-i18next";
import {ButtonLink} from "../component/ButtonLink";
import {ScrollToTop} from "../component/ScrollToTop";
import {HomeIcon} from "../icon/HomeIcon";
import {useLayoutContext} from "../layout/LayoutContext";

export interface INotFoundViewProps {
	/**
	 * Link ID used to redirect on "not found". Internally uses {@see IRouterContext::generate}.
	 */
	href: string
}

/**
 * Simple 4o4 view.
 */
export const NotFoundView: FC<INotFoundViewProps> = ({href}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	return (
		<>
			<Helmet title={t("error.not-found.title")}/>
			<ScrollToTop/>
			<Result
				status="404"
				title={t("error.not-found.title")}
				subTitle={t("error.not-found.body")}
				extra={
					<ButtonLink size={"large"} href={href} icon={<HomeIcon/>} title={"common.homepage"}/>
				}
			/>
		</>
	);
};
