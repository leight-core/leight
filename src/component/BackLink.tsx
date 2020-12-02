import {Button} from "antd";
import PropTypes from "prop-types";
import React from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {BackIcon} from "../icon/BackIcon";

/**
 * Just a simple back button using react-router under hood to navigate one history entry back.
 *
 * Props are passed to underlying Button.
 *
 * See:
 *
 * - https://ant.design/components/button/
 */
export const BackLink = (
	{
		text,
		...props
	}) => {
	const navigate = useNavigate();
	const {t} = useTranslation();
	return (
		<Button
			type={"link"}
			size={"small"}
			icon={<BackIcon/>}
			onClick={() => navigate(-1)}
			children={t(text)}
			{...props}
		/>
	);
};

BackLink.propTypes = {
	/**
	 * Text on the button, goes through translation.
	 */
	text: PropTypes.string.isRequired,
}
