import {TranslationOutlined} from "@ant-design/icons";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";

const TranslationStep = props => {
	return (
		<LoaderStep icon={<TranslationOutlined/>} {...props} onStep={stepLoaderContext => {
			setTimeout(() => {
				stepLoaderContext.next();
			}, 250);
		}}/>
	);
};

export default TranslationStep;
