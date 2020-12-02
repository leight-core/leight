import {Button} from "antd";
import React from "react";
import {ContinueIcon} from "./ContinueIcon";

export default {
	title: "Leight/Icon/Continue Icon",
	component: ContinueIcon,
};

const Template = _ => <ContinueIcon/>;

export const Icon = Template.bind({});

export const ButtonExample = () => <Button type={"primary"} ghost size={"large"} icon={<Icon/>} children={"Continue"}/>;
