import {Button, Card, Result} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";

const SignedInView = ({link}) => {
	const {t} = useTranslation();
	const layoutContext = useLayoutContext();
	layoutContext.useEnableFullscreen();
	return (
		<Card>
			<Result
				status={"success"}
				title={t(`common.succeed.title`)}
				subTitle={t(`common.succeed.subtitle`)}
				extra={[
					<Button type="primary" key="continue">
						<Link to={link}>{t(`common.continue`)}</Link>
					</Button>
				]}
			/>
		</Card>
	);
};

SignedInView.propTypes = {
	/**
	 * Target href (on continue).
	 */
	link: PropTypes.string.isRequired,
};

export default SignedInView;
