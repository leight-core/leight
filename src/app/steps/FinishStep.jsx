import React from "react";
import HomeIcon from "../../icon/HomeIcon";
import LoaderStep from "../../loader/LoaderStep";
import {Random} from "../../utils/Random";
import {useAppContext} from "../AppContext";

const FinishStep = props => {
	const appContext = useAppContext();
	return (
		<LoaderStep icon={<HomeIcon/>} {...props} onStep={() => {
			setTimeout(() => appContext.ready(), Random(100, 200));
		}}/>
	);
};

export default FinishStep;
