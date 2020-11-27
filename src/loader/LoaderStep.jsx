import {Steps} from "antd";
import React, {useEffect, useState} from "react";
import Spinner from "../icon/Spinner";
import {useStepLoaderContext} from "./StepLoaderContext";

const LoaderStep = ({onStep, icon, ...props}) => {
	const [loading, setLoading] = useState(false);
	const stepLoaderContext = useStepLoaderContext();
	useEffect(() => {
		setLoading(props.active);
		if (props.active) {
			return onStep(stepLoaderContext);
		}
	}, [props.active]);
	return (
		<Steps.Step
			{...props}
			icon={<Spinner done={!loading || stepLoaderContext.status === "error"} children={icon}/>}
		/>
	);
};

export default LoaderStep;
