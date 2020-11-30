import {Button, Card, Result} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";

const SignedOutView = ({link}) => {
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	layoutContext.useEnableFullscreen();
	return (
		<Card>
			<Result
				status="success"
				title={t("common.sign-out.succeed.title")}
				subTitle={t("common.sign-out.succeed.subtitle")}
				extra={
					<Button type="primary" key="continue">
						<Link to={link}>{t("common.sign-out.continue")}</Link>
					</Button>
				}
			/>
		</Card>
	);
};

SignedOutView.propTypes = {
	/**
	 * Target href to redirect.
	 */
	link: PropTypes.string.isRequired,
};

export default SignedOutView;
