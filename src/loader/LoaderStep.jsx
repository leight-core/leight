import {Steps} from "antd";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import Spinner from "../icon/Spinner";
import {useStepLoaderContext} from "./StepLoaderContext";

/**
 * Step implementation - when active, an action (onStep) is executed.
 */
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

/**
 * @typedef {function} LoaderStepOnStepType
 * @param {StepLoaderContextType} stepLoaderContext
 */

LoaderStep.propTypes = {
	/**
	 * Step function being executed when this step is action (do not use React Hooks!).
	 *
	 * @type {LoaderStepOnStepType}
	 */
	onStep: PropTypes.func.isRequired,
};

export default LoaderStep;
