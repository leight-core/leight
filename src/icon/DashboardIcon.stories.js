import {Button} from "antd";
import React from "react";
import DashboardIcon from "./DashboardIcon";

export default {
	title: "Leight/Icon/Dashboard Icon",
	component: DashboardIcon,
};

const Template = _ => <DashboardIcon/>;

export const Icon = Template.bind({});

export const ButtonExample = Template.bind({});

ButtonExample.decorators = [Story => <Button type={"primary"} ghost size={"large"} icon={<Story/>} children={"Dashboard"}/>];
