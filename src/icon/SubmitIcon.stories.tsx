import {Button} from "antd";
import React from "react";
import {SubmitIcon} from "./SubmitIcon";

export default {
	title: "Leight/Icon/Submit Icon",
	component: SubmitIcon,
};

const Template = _ => <SubmitIcon/>;

export const Icon = Template.bind({});

export const ButtonExample = () => <Button type={"primary"} ghost size={"large"} icon={<Icon/>} children={"Submit"}/>;
