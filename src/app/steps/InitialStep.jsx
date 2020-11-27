import {LoginOutlined} from "@ant-design/icons";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {Random} from "../../utils/Random";

const InitialStep = props => {
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<LoginOutlined/>} {...props} onStep={() => {
			setTimeout(() => {
				stepLoaderContext.next();
			}, Random(500, 1200));
		}}/>
	);
};

export default InitialStep;
