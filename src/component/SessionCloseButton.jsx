import {Button} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {useAppContext} from "../app/AppContext";

const SessionCloseButton = (
	{
		text,
		...props
	}) => {
	const appContext = useAppContext();
	const {t} = useTranslation();
	return (
		<Button
			type="primary"
			onClick={() => appContext.logout()} children={t(text)}
			{...props}
		/>
	);
};

SessionCloseButton.propTypes = {
	/**
	 * Text on the button, goes through translation.
	 */
	text: PropTypes.string.isRequired,
};

export default SessionCloseButton;
