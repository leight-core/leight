import {SettingFilled} from "@ant-design/icons";
import {Result} from "antd";
import React from "react";
import {ScrollToTop} from "../component/ScrollToTop";

export const LoaderView = () => {
	return (
		<>
			<ScrollToTop/>
			<Result
				style={{marginTop: "10vh"}}
				icon={<SettingFilled spin style={{fontSize: 42}}/>}
			/>
		</>
	);
};
