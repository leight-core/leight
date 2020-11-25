import {Button} from "antd";
import React from "react";
import CreateIcon from "./CreateIcon";

export default {
	title: "Leight/Icon/Create Icon",
	component: CreateIcon,
};

export const Icon = () => <CreateIcon/>;

export const ButtonExample = () => <Button type={"primary"} ghost size={"large"} icon={<Icon/>} children={"Create"}/>;
