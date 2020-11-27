import React from "react";
import HomeIcon from "../../icon/HomeIcon";
import LoaderStep from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import {useAppContext} from "../AppContext";

const FinishStep = props => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<HomeIcon/>} {...props} onStep={() => {
			setTimeout(() => {
				stepLoaderContext.next();
			}, 650);
		}}/>
	);
};

export default FinishStep;
