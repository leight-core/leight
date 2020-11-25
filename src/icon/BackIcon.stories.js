import {Button} from "antd";
import React from "react";
import BackIcon from "./BackIcon";

export default {
	title: "Leight/Icon/Back Icon",
	component: BackIcon,
};

const Template = _ => <BackIcon/>;

export const Icon = Template.bind({});

export const ButtonExample = () => <Button type={"primary"} ghost size={"large"} icon={<Icon/>} children={"Back"}/>;
