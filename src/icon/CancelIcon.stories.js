import {Button} from "antd";
import React from "react";
import CancelIcon from "./CancelIcon";

export default {
	title: "Leight/Icon/Cancel Icon",
	component: CancelIcon,
};

export const Icon = () => <CancelIcon/>;

export const ButtonExample = () => <Button type={"danger"} ghost size={"large"} icon={<Icon/>} children={"Cancel"}/>;
