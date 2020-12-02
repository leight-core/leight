import {Button} from "antd";
import React from "react";
import {ContinueIcon} from "./ContinueIcon";
import {CreateIcon} from "./CreateIcon";

export default {
	title: "Leight/Icon/Create Icon",
	component: CreateIcon,
};

const Template = _ => <ContinueIcon/>;

export const Icon = Template.bind({});

export const ButtonExample = () => <Button type={"primary"} ghost size={"large"} icon={<Icon/>} children={"Create"}/>;
