import { Menu } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCleverLink } from "../hook";

const MenuItem = (props) => {
	const {t}  = useTranslation();
	const link = useCleverLink(props.href);

	return (
		<Menu.Item icon={props.icon} {...props} disabled={!link.enable}>
			<Link to={link.link} children={t(`${props.id}.menu`)}/>
		</Menu.Item>
	);
};

MenuItem.propTypes = {
	id:   PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	href: PropTypes.object.isRequired,
};

export default MenuItem;
