import {Button} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {useSessionContext} from "../session/SessionContext";

const SessionCloseButton = (
	{
		text,
		...props
	}) => {
	const sessionContext = useSessionContext();
	const {t} = useTranslation();
	return (
		<Button
			type="primary"
			onClick={() => sessionContext.close()} children={t(text)}
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
