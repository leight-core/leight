import {Button} from "antd";
import {useNavigate} from "react-router";
import BackIcon from "../icon/BackIcon";

const BackLink = ({text}) => {
	const navigate = useNavigate();
	return <Button type={"link"} size={"small"} icon={<BackIcon/>} onClick={() => navigate(-1)}> {text}</Button>;
};

export default BackLink;
