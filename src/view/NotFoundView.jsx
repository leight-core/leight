import {
	Button,
	Result
} from "antd";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import HomeIcon from "../icon/HomeIcon";
import useLayoutContext from "../layout/useLayoutContext";

const NotFoundView = () => {
	const {t}           = useTranslation();
	const layoutContext = useLayoutContext();
	layoutContext.useEnableFullscreen();

	return (
		<>
			<Helmet title={t("error.not-found.title")}/>
			<Result
				status="404"
				title={t("error.not-found.title")}
				subTitle={t("error.not-found.body")}
				extra={
					<Link to={process.env.PUBLIC_URL + "/"} children={<Button type="primary" icon={<HomeIcon/>} children={t("common.homepage")}/>}/>
				}
			/>
		</>
	);
};

export default NotFoundView;
