import {Menu} from "antd";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import useCleverLink from "../hook/useCleverLink";

const MenuItem = ({id, icon, href, ...props}) => {
	const {t} = useTranslation();
	const link = useCleverLink(href);

	return (
		<Menu.Item icon={icon} {...props} disabled={!link.enable}>
			<Link to={link.link} children={t(id + ".menu")}/>
		</Menu.Item>
	);
};

MenuItem.propTypes = {
	id: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
	href: PropTypes.string.isRequired,
};

export default MenuItem;
