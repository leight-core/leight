import {Button, Card, Result} from "antd";
import PropTypes from "prop-types";
import React from "react";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useLayoutContext} from "../layout/LayoutContext";

export const SignedOutView = ({link}) => {
	const {t} = useTranslation();
	useLayoutContext().useEnableFullscreen(true, true);
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
