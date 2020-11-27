import {CompassOutlined} from "@ant-design/icons";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";

const DiscoveryStep = props => {
	return (
		<LoaderStep icon={<CompassOutlined/>} {...props} onStep={stepLoaderContext => {
			setTimeout(() => {
				stepLoaderContext.next();
			}, 650);
		}}/>
	);
};

export default DiscoveryStep;
