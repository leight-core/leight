import {LoginOutlined} from "@ant-design/icons";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";

const InitialStep = props => {
	return (
		<LoaderStep icon={<LoginOutlined/>} {...props} onStep={stepLoaderContext => {
			setTimeout(() => {
				stepLoaderContext.next();
			}, 650);
		}}/>
	);
};

export default InitialStep;
