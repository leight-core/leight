import {Button} from "antd";
import {useNavigate} from "react-router";
import BackIcon from "../icon/BackIcon";

/**
 * Just a simple back button using react-router under hood to navigate one history entry back.
 *
 * Props are passed to underlying Button.
 *
 * See:
 *
 * - https://ant.design/components/button/
 */
const BackLink = (
	{
		text,
		...props
	}) => {
	const navigate = useNavigate();
	return (
		<Button
			type={"link"}
			size={"small"}
			icon={<BackIcon/>}
			onClick={() => navigate(-1)}
			children={text}
			{...props}
		/>
	);
};

export default BackLink;
