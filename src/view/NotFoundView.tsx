import {Button, Result} from "antd";
import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useAppContext} from "../app/AppContext";
import {HomeIcon} from "../icon/HomeIcon";
import {useLayoutContext} from "../layout/LayoutContext";
import {link} from "../router/index";

export interface INotFoundView {
	/**
	 * Link ID used to redirect on "not found". Internally uses {@see link}.
	 */
	href: string
}

/**
 * Simple 4o4 view.
 */
export const NotFoundView: FC<INotFoundView> = ({href}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
	useAppContext().useTitle("error.not-found.title");
	return (
		<Result
			status="404"
			title={t("error.not-found.title")}
			subTitle={t("error.not-found.body")}
			extra={
				<Link to={link(href)} children={<Button type="primary" icon={<HomeIcon/>} children={t("common.homepage")}/>}/>
			}
		/>
	);
};
