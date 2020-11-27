import React from "react";
import HomeIcon from "../../icon/HomeIcon";
import LoaderStep from "../../loader/LoaderStep";

const FinishStep = props => {
	return (
		<LoaderStep icon={<HomeIcon/>} {...props} onStep={stepLoaderContext => {
			setTimeout(() => {
				stepLoaderContext.next();
			}, 650);
		}}/>
	);
};

export default FinishStep;
