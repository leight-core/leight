import {Button} from "antd";
import React from "react";
import CreateItemIcon from "./CreateItemIcon";

export default {
	title: "Leight/Icon/Create Item Icon",
	component: CreateItemIcon,
};

export const Icon = () => <CreateItemIcon/>;

export const ButtonExample = () => <Button type={"primary"} ghost size={"large"} icon={<Icon/>} children={"Create Item"}/>;
