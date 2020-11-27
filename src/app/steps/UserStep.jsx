import {UserOutlined} from "@ant-design/icons";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {useAppContext} from "../AppContext";

const UserStep = props => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<UserOutlined/>} {...props} onStep={() => {
			setTimeout(() => {
				stepLoaderContext.next();
			}, 1200);
		}}/>
	);
};

export default UserStep;
