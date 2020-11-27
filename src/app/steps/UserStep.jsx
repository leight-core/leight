import {UserOutlined} from "@ant-design/icons";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";

const UserStep = props => {
	return (
		<LoaderStep icon={<UserOutlined/>} {...props} onStep={stepLoaderContext => {
			setTimeout(() => {
				stepLoaderContext.next();
			}, 1200);
		}}/>
	);
};

export default UserStep;
