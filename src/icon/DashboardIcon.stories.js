import {Button} from "antd";
import React from "react";
import DashboardIcon from "./DashboardIcon";

export default {
	title: "Leight/Icon/Dashboard Icon",
	component: DashboardIcon,
};

export const Icon = () => <DashboardIcon/>;

export const ButtonExample = () => <Button type={"primary"} ghost size={"large"} icon={<Icon/>} children={"Dashboard"}/>;
