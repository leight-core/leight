import {TranslationOutlined} from "@ant-design/icons";
import i18next from "i18next";
import PropTypes from "prop-types";
import React from "react";
import LoaderStep from "../../loader/LoaderStep";
import {useStepLoaderContext} from "../../loader/StepLoaderContext";
import httpGet from "../../server/httpGet";
import Events from "../../utils/Events";
import {useAppContext} from "../AppContext";

const TranslationStep = ({link = "common.translation", ...props}) => {
	const appContext = useAppContext();
	const stepLoaderContext = useStepLoaderContext();
	return (
		<LoaderStep icon={<TranslationOutlined/>} {...props} onStep={() => {
			const cancelToken = httpGet(
				appContext.link(link),
				Events()
					.on("success", ({translations}) => {
						for (const translation of translations) {
							i18next.addResource(translation.language, translation.namespace, translation.label, translation.text);
						}
						stepLoaderContext.next();
					})
					.on("catch", () => {
						stepLoaderContext.setStatus("error");
					})
			);
			return () => cancelToken.cancel();
		}}/>
	);
};

TranslationStep.propTypes = {
	/**
	 * Which link from Discovery index should be used to retrieve translations.
	 */
	link: PropTypes.string,
};

export default TranslationStep;
