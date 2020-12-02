import {SettingFilled} from "@ant-design/icons";
import {Result} from "antd";
import React from "react";

export const LoaderView = () => {
	return (
		<Result
			style={{marginTop: "10vh"}}
			icon={<SettingFilled spin style={{fontSize: 42}}/>}
		/>
	)
}
