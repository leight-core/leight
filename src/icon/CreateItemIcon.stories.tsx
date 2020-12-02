import {Button} from "antd";
import React from "react";
import {CreateItemIcon} from "./CreateItemIcon";

export default {
	title: "Leight/Icon/Create Item Icon",
	component: CreateItemIcon,
};

const Template = _ => <CreateItemIcon/>;

export const Icon = Template.bind({});

export const ButtonExample = () => <Button type={"primary"} ghost size={"large"} icon={<Icon/>} children={"Create Item"}/>;
