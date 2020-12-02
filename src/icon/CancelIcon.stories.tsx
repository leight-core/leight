import {Button} from "antd";
import React from "react";
import {CancelIcon} from "./CancelIcon";

export default {
	title: "Leight/Icon/Cancel Icon",
	component: CancelIcon,
};

const Template = _ => <CancelIcon/>;

export const Icon = Template.bind({});

export const ButtonExample = () => <Button type={"primary"} danger ghost size={"large"} icon={<Icon/>} children={"Cancel"}/>;
